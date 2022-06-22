import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native' //importando librerias de react-native
import React, {Component} from 'react' //base de una screen con estado
import { auth } from '../../firebase/config'; //importando autenticador de firebase

class Register extends Component {
  constructor(props){
    super(props);
    this.state={ //declarando los estados
      email:'', // '' (en formato string)
      userName:'',
      password:'',
      logedIn:false,
      error:null,
      message:''
    }
  }

  
  componentDidMount(){
    // console.log(this.props.route.params.registerError)
    auth.onAuthStateChanged((user)=>{
      // console.log(user)
    })
  }
  

  
  render(){ //renderizando la screen register
    const {signUp} = this.props //declarando el metodo singUp que traje por props desde el padre stackNav como una constante

    return (
      <View>
        <TextInput //formulario de email
          style={styles.input}
          onChangeText={text => this.setState({email: text})} //guardando el texto escrito en el estado
          keyboardType='email-address' //tipo de teclado
          placeholder='email'
        />
        <TextInput //form de userName
          style={styles.input}
          onChangeText={text => this.setState({userName: text})}
          keyboardType='email-address'
          placeholder='userName'
        />
        <TextInput
          style={styles.input} //form de password
          onChangeText={text => this.setState({password: text})}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true} //propiedad que encrypta la contraseña
        />
        {this.state.email !== '' && this.state.userName !== '' && this.state.password !== '' ? //si los tres textImput estan vacios no renderizo el boton de register
        <TouchableOpacity style={styles.button} onPress={
          () => {
            signUp(this.state.email, this.state.password, this.state.userName) //ejecutando el metodo singUp declarado en StackNav
          }}>
          <Text style={styles.btnT}>
            Register
          </Text>
        </TouchableOpacity>
        : //parte del condicional ternario
        <View>
        <Text style={styles.emptyT}>Please complete the empty fields</Text>
        <Text>example de Email: example@example.com</Text>
        <Text>example de userName: exampleUserName</Text>
        <Text>example de password: example (more than 6 leters)</Text>
        </View>
        }
        <View style={this.props.registerError ? styles.showError : styles.hideError}> {/*mostrando u ocultando el mensaje error de registro*/}
        <Text style={styles.errorText}>{this.props.registerError}</Text>
        </View>
        <Text style={styles.btnR}>
        Do you have an account?
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')}> {/*redirecciona al screen login */}
        <Text style={styles.btnT}>
          Go to login
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles =  StyleSheet.create({ //constante de nombre styles que utiliza el metodo create() del objeto stylesheet
  input:{
    borderWidth:2,
    borderColor:'black',
    marginVertical:8,
    padding: 3,
  },
  button:{
    flex:1,
    marginVertical:10,
    paddingVertical:16,
    paddingHorizontal:8,
    borderColor:'grey',
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'black',
    alignItems: 'center',
    marginHorizontal:'auto'
    
  },
  btnR:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnT:{
    color: 'white',
    fontSize: 20,
  },
  hideError:{
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 7,
    opacity: 0
  },
  showError:{
    display: 'flex',
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 7,
  },
  emptyT:{
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Register
