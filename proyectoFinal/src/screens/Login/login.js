import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {Component} from 'react'

class Login extends Component { 
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
    }
  }
  


  render(){
    const {signIn} = this.props //declarando el metodo singIn que traje por props desde el padre stackNav como una constante
    return (
      <View>
        <TextInput
          style={styles.input} //formulario de email
          onChangeText={text => this.setState({email: text})} //guardando el texto escrito en el estado
          keyboardType='email-address'
          placeholder='email'
        />
        <TextInput
          style={styles.input} //formulario de password
          onChangeText={text => this.setState({password: text})}//guardando el texto escrito en el estado
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true} //propiedad que encrypta la contraseña
        />
        <TouchableOpacity style={styles.button} onPress={() => signIn(this.state.email, this.state.password)}>
          <Text style={styles.btnT}>
            Loguearme
          </Text>
        </TouchableOpacity>
        <View style={this.props.loginError ? styles.showError : styles.hideError}> {/*mostrando u ocultando el mensaje error de registro*/}
        <Text style={styles.errorText}>{this.props.loginError}</Text> {/*texto del error*/}
        </View>
        <Text style={styles.btnR}>
          You don't have an account?
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Register')}>
        <Text style={styles.btnT}>
          Go to register
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  input:{
    borderColor: 'black',
        borderWidth: 2,
        borderRadius: 2,
        padding:3,
        marginVertical:8
  },
  button:{
    flex:1,
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'black',
    paddingVertical:16,
    paddingHorizontal:8,
    alignItems: 'center',
    marginHorizontal:'auto',
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
  btnT:{
    color: 'white',
    fontSize: 20,
  },
  btnR:{
    fontSize: 16,
    fontWeight: 'bold'
  }
})


export default Login