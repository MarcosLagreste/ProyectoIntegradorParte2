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
        auth.signOut()
        .then(response => this.setState({loggedIn: false}))
        .catch(error => console.log(error))
    }

    
    signUp(email, password, userName){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            db.collection("users").add({
            email: email,
            userName: userName, 
            createdAt: Date.now(),
        })})
        .then(response => this.setState({logedIn: true})) 
        .catch(error => this.setState({registerError: `Problems because of ${error.message}`}))
        .catch(e => {
            this.setState({registerError: error.message})
        })
    }


    signIn(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            //nescesitamos traer al user y actualizarle lastLogin
            //db.collection('users').doc
            console.log(response.user.metadata);
            this.setState({
                loggedIn:true
            })
        })
        .catch(error =>this.setState({loginError: error.message}))
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
                                initialParams={
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
    
                                children={
                                    (props)=> <Register 
                                    signUp={(email, password, userName)=> this.signUp(email, password, userName)}
                                    registerError={this.state.registerError}
                                    {...props}
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