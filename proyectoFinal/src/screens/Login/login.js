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
    const {signIn} = this.props.route.params
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
          onChangeText={text => this.setState({password: text})}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => signIn(this.state.email, this.state.password)}>
          <Text>
            Loguearme
          </Text>
        </TouchableOpacity>
        <Text>
          No tienes una cuenta?
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Register')}>
        <Text>
          Ir al register
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  input:{
    borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8
  },
  button:{
    flex:1,
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'lightgreen',
    paddingVertical:16,
    paddingHorizontal:8,
    marginHorizontal:'auto',
  },
})


export default Login