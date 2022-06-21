import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {Component} from 'react'
import { auth } from '../../firebase/config';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      userName:'',
      password:'',
      logedIn:false,
      error:null,
      message:''
    }
  }

  
  componentDidMount(){
    // console.log(this.props.route.params.errorMessage)
    auth.onAuthStateChanged((user)=>{
      // console.log(user)
    })
  }
  

  
  render(){
    const {signUp} = this.props

    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({email: text})}
          keyboardType='email-address'
          placeholder='email'
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({userName: text})}
          keyboardType='email-address'
          placeholder='userName'
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({password: text})}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
        />
        {this.state.email !== '' && this.state.userName !== '' && this.state.password !== '' ?
        <TouchableOpacity style={styles.boton} onPress={
          () => {
            signUp(this.state.email, this.state.password, this.state.userName)
          }}>
          <Text>
            Register
          </Text>
        </TouchableOpacity>
        :
        <View>
        <Text>Por favor completar los campos</Text>
        <Text>ejemplo de Email: ejemplo@ejemplo.com</Text>
        <Text>ejemplo de userName: ejemploUserName</Text>
        <Text>ejemplo de password: ejemplo (more than 6 leters)</Text>
        </View>
        }
        <View style={this.props.registerError ? styles.showError : styles.hideError}>          
        <Text style={styles.errorText}>{this.props.registerError}</Text>
        </View>
        <Text>
          Ya tienes una cuenta?
        </Text>
        <TouchableOpacity style={styles.boton} onPress={()=>this.props.navigation.navigate('Login')}>
        <Text>
          Ir al login
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  input:{
    borderWidth:2,
    borderColor:'black',
    marginTop:16
  },
  boton:{
    flex:1,
    marginVertical:16,
    padding:16,
    borderWidth:2,
    borderColor:'blue',
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'lightgreen',

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
})

export default Register
