import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'; //importando base de datos y autenticador
import Posts from '../../components/Posts'; //importando componente Posts


class Profile extends Component { //componente con clase
  constructor(props){
    super(props)
    this.state={ //estados del componente
      userData: {}, //objeto literal userData
      posteos: [], //array posteos
      loading: true
    }
  }
  componentDidMount(){ //montaje de un componente
    db.collection('users') //trayendo la coleccion de datos users que correspondan al where
    .where('email','==',auth.currentUser.email).onSnapshot(docs => { //obtiene todos los documentos de la coleccion y los coloca en el parametro docs
      docs.forEach(doc => {
      this.setState( //modifica el estado con lo que recopilo el metodo onSnapshot de la coleccion
        {
          userData:doc.data() 
        },
        ()=> console.log(this.state.userData)) //muestro en la consola userData
      })
    })
    db.collection('posts').orderBy('createdAt', 'desc') //traigo la coleccion posts con orden de creacion descendente
    .where('owner','==',auth.currentUser.email).onSnapshot
        (docs => {
          let posts = [] //variable posts como objeto literal
          docs.forEach(doc => { //recorremos el array de documentos
            posts.push({ //pusheamos en el array de resultados un objeto literal con el id de cada documento y la la info del documento que se obtiene con el metodo data()
              id: doc.id,
              data: doc.data()
            })
          this.setState({ //guardamos los datos en el estado del componente que luego renderizara los posteos dentro de la flatlist
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
    const userEmail = this.state.userData.email //estado traido de la coleccion
    const userName = this.state.userData.userName
    const date = auth.currentUser.metadata.lastSignInTime //usando el autenticador para acceder a la metadata del usuario
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
          data={this.state.posteos}//renderizamos posteos que seteamos en el estado anterior
          keyExtractor={item=>item.id.toString()}
          renderItem={({item}) => <Posts info={item} navigation={this.props.navigation}/> }  //<Text>{item.data.description}</Text>}
          />
       }
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={()=> this.props.route.params.logout()}>
          <Text style={styles.btnT}> {/*ejecutando metodo de logout de stack pasado por props */}
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