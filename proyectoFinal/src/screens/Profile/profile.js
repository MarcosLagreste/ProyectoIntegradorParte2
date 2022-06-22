import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config';
import Posts from '../../components/Posts';


class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      userData: {},
      posteos: [], 
      loading: true
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
    db.collection('posts').orderBy('createdAt', 'desc')
    .where('owner','==',auth.currentUser.email).onSnapshot
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
    const creation = auth.currentUser.metadata.creationTime
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.nombrePagina}>My Profile</Text>
      <Text style={styles.email}>{userEmail}</Text>
      <Text style={styles.userN}>Hello {userName}</Text>
      <Text style={styles.day}>Last loggedIn: {date}</Text>
      <Text style={styles.day}>Since: {creation}</Text>
      </View>
      <View style={styles.flt}>
       <Text>My posts:</Text>
       {this.state.loading ? 
       <ActivityIndicator
       size={30}
       color='black'/>
       :
       <FlatList 
          data={this.state.posteos}
          keyExtractor={item=>item.id.toString()}
          renderItem={({item}) => <Posts info={item} navigation={this.props.navigation}/> }  //<Text>{item.data.description}</Text>}
          />
       }
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={()=> this.props.route.params.logout()}>
          <Text style={styles.btnT}>
              Log Out
          </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}}
const styles = StyleSheet.create({
  flt:{
    flex: 6
  },
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
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'black',
    paddingVertical:6,
    paddingHorizontal:8,
    marginHorizontal:'auto',
    textAlign: 'center',
    width: '50%'
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