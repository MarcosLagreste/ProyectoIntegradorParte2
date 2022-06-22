import React, {Component} from 'react'
import { auth, db } from '../firebase/config';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import Register from "../screens/Register/Register";
import { StatusBar } from 'expo-status-bar';
import TabNavigation from './TabNavigation';
import Comments from '../screens/Comments/Comments'
import AgregarPosts from '../screens/AgregarPosts/AgregarPosts';

const Stack = createNativeStackNavigator()

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            loginError:'',
            registerError:'',
        }
    }
    

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({loggedIn: true})
            }
        })
    }

    logout(){
        auth.signOut()//ejecutando metodo de auth singOut
        .then(response => this.setState({loggedIn: false})) //luego modifico el estado de loggedIn a false para que renderize login y register
        .catch(error => console.log(error))
    }

    
    signUp(email, password, userName){  //implemento los parametros que luego utilizare en el imput
        auth.createUserWithEmailAndPassword(email, password) //metodo de auth(firebase)
        .then(response => {
            db.collection("users").add({ //agrega a la coleccion users las propiedades con sus respectivos parametros
            email: email,
            userName: userName, 
            createdAt: Date.now(),
        })})
        .then(response => this.setState({logedIn: true}))  //modifico el estado
        .catch(error => this.setState({registerError: `Problems because of ${error.message}`})) // guardando mensaje de error en caso de no cumplir con lo minimo de auth para el metodo
        //.catch(e => {
            //this.setState({registerError: error.message}) 
        //})
    }


    signIn(email, password){ //metodo de login
        auth.signInWithEmailAndPassword(email, password) //uso el auth de firebase para corroborar los datos e ingresar
        .then(response => {
            console.log(response.user.metadata);
            this.setState({
                loggedIn:true //seteo estado del boleano a true
            })
        })
        .catch(error =>this.setState({loginError: error.message})) //tomo el error y lo guardo en el estado de loginError
    }

    nuevoPost(description, photo){
        if(description !== ''){
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                description: description,
                likes: [],
                comments:[],
                photo: photo
            })
            .then()
            .catch(e=> console.log(e))
        }  
      }

    render(){
        return(
            <NavigationContainer
            >
                <Stack.Navigator>
                    {
                         this.state.loggedIn ?
                        <Stack.Group>
                           <Stack.Screen 
                                name='TabNavigation' 
                                component={TabNavigation}
                                options={{
                                    headerShown:false
                                }}
                                initialParams={ //pasamos datos y/o funciones a la scren para que las considere al inico del renderizado
                                    {
                                        logout: () => this.logout(),
                                        nuevoPost: (description, photo) => this.nuevoPost(description, photo),
                                        errorMessage: this.message
                                    }
                                }
                            />
                            <Stack.Screen 
                                name='AgregarPosts'
                                component={AgregarPosts}
                                initialParams={{
                                    nuevoPost: (description, photo) => this.nuevoPost(description, photo)
                                }}
                                options={{unmountOnBlur: true}}
                            />
                            <Stack.Screen
                                name='Comments'
                                component={Comments}
                            /> 
                        </Stack.Group>
                         :
                        <Stack.Group>
                            <Stack.Screen 
                                name='Register' 
    
                                children={ //para renderizar el componente debemos pasar una funcion que retorne el componente junto con la info del estado que enviaremos
                                    (props)=> <Register
                                    signUp={(email, password, userName)=> this.signUp(email, password, userName)}
                                    registerError={this.state.registerError}
                                    {...props} //operador spread que sirve para pasar las props tal cual se reciben
                                    />
                    
                                }
                                options={{
                                    headerShown:false
                                }}
                            />
                            <Stack.Screen 
                            name='Login' 
                            children={
                                (props)=> <Login 
                                signIn= {(email, password)=> this.signIn(email, password)}
                                loginError={this.state.loginError}
                                {...props}
                                />
                            }
                            options={{
                                headerShown:false
                            }}
                            />
                        </Stack.Group>
                    }
                        
                </Stack.Navigator>
    </NavigationContainer>

        )
    }

}

export default StackNavigation