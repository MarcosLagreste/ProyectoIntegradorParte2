import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config';


class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      userData: {}
    }
  }
componentDidMount(){
  db.collection('users')
  .where('email','==',auth.currentUser.email).onSnapshot(docs => {
    docs.forEach(doc => {
     this.setState(
      {
        userData:doc.data()
      },
      ()=> console.log(this.state.userData)) 
    })
    
  })
}
  
  render(){
      // console.log(props.route);
    console.log(auth.currentUser)
    console.log(db.collection('users'))
    const userEmail = this.state.userData.email
    const userName = this.state.userData.userName
    const date = auth.currentUser.metadata.lastSignInTime
  return (
    <View>
      <Text style={styles.nombrePagina}>My Profile</Text>
      <Text style={styles.email}>{userEmail}</Text>
      <Text style={styles.userN}>Hola {userName}</Text>
      <Text style={styles.day}>Last loggedIn: {date}</Text>
      <TouchableOpacity style={styles.btn} onPress={()=> this.props.route.params.logout()}>
          <Text style={styles.btnC}>
              Cerrar sesion
          </Text>
      </TouchableOpacity>
    </View>
  )
}}
const styles = StyleSheet.create({
  nombrePagina:{
    borderWidth:1,
    fontSize: 18
  },
  email:{
    borderWidth:1,
    paddingVertical:10,
    fontSize: 18
  },
  userN:{
    borderWidth:1,
    paddingVertical:10,
    textTransform: 'capitalize',
    fontSize: 18
  },
  day:{
    borderWidth:1,
    paddingVertical:10,
    fontSize: 18
  },
  btn:{
    flex:1,
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'black',
    paddingVertical:16,
    paddingHorizontal:8,
    marginHorizontal:'auto',
  },
  btnC:{
    color: 'white',
    fontSize: 20
  }


})
export default Profile