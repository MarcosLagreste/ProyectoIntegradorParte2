import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config';
import Posts from '../../components/Posts';


class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      userData: {},
      posts : []
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
  db.collection('posts')
  .where('email','==',auth.currentUser.email).onSnapshot
      (docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        this.setState({
          posteos: posts,
          loading: false
        }, ()=> console.log(this.state.posteos))  
        })
      }
    )
}
  
  render(){
      // console.log(props.route);
    //console.log(auth.currentUser)
    //console.log(db.collection('users'))
    const userEmail = this.state.userData.email
    const userName = this.state.userData.userName
    const date = auth.currentUser.metadata.lastSignInTime
  return (
    <View>
      <View>
      <Text style={styles.nombrePagina}>My Profile</Text>
      <Text style={styles.email}>{userEmail}</Text>
      <Text style={styles.userN}>Hola {userName}</Text>
      <Text style={styles.day}>Last loggedIn: {date}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=> this.props.route.params.logout()}>
          <Text style={styles.btnT}>
              Cerrar sesion
          </Text>
      </TouchableOpacity>
      <View style={styles.container}>
      {this.state.loading ? 
       <ActivityIndicator
       size={30}
       color='black'/>
       :
       <FlatList 
          data={this.state.posteos}
          keyExtractor={item=>item.id.toString()}
          renderItem={({item}) => <Posts info={item} navigation={this.props.navigation}/> }
          />
        }
       </View>
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
  btnT:{
    color: 'white',
    fontSize: 20
  },
  container:{
    flex:1
  }


})
export default Profile