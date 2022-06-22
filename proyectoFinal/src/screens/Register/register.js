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
        <TouchableOpacity style={styles.button} onPress={
          () => {
            signUp(this.state.email, this.state.password, this.state.userName)
          }}>
          <Text style={styles.btnT}>
            Register
          </Text>
        </TouchableOpacity>
        :
        <View>
        <Text style={styles.emptyT}>Please complete the empty fields</Text>
        <Text>example de Email: example@example.com</Text>
        <Text>example de userName: exampleUserName</Text>
        <Text>example de password: example (more than 6 leters)</Text>
        </View>
        }
        <View style={this.props.registerError ? styles.showError : styles.hideError}>          
        <Text style={styles.errorText}>{this.props.registerError}</Text>
        </View>
        <Text style={styles.btnR}>
        Do you have an account?
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')}>
        <Text style={styles.btnT}>
          Go to login
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
