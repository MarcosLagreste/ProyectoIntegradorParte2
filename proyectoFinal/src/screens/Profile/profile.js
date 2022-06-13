import { View, Text, TouchableOpacity } from 'react-native'
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
      <Text>Profile</Text>
      <Text>{userEmail}</Text>
      <Text>Hola {userName}</Text>
      <Text>Last loggedIn: {date}</Text>
      <TouchableOpacity onPress={()=> this.props.route.params.logout()}>
          <Text>
              Cerrar sesion
          </Text>
      </TouchableOpacity>
    </View>
  )
}}
export default Profile