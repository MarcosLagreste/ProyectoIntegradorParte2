import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';

class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
          cantComentarios: 0,
          comentarios: [],
          nuevoComentario: ''
    
        }
      }

    componentDidMount(){
      db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot( doc => {
        this.setState({
          comentarios: doc.data().comments
        }, ()=> {
          if(this.state.comentarios){
            this.setState({
                cantComentarios: this.state.comentarios.length
            })
          }
        })
        }
      )
      
    }

    onSubmit(elComentario){
      const comment = {
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        description: elComentario
      }

      if(elComentario !== ''){
        db.collection('posts')
        .doc(this.props.route.params.id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
        .then(response => this.setState({
          nuevoComentario: '',
          cantComentarios: this.state.cantComentarios + 1
        }))
        .catch(e => console.log(e))
      }
    }

    render(){
  return (
    <View>
      <Text>{this.props.route.params.pie}</Text>
      {this.state.cantComentarios === 0 ?
        <Text>Aun no hay comentarios. Se el primero en opinar.</Text>
      : <FlatList
        data={this.state.comentarios}
        keyExtractor={item => item.createdAt.toString()}
        renderItem={({item}) => <View><Text>{item.owner}</Text><Text>{item.description}</Text></View>}
        />
      }
      
      <View>
        <TextInput
        placeholder='Agrega tu comentario'
        onChangeText={(text) => this.setState({nuevoComentario: text})}
        value={this.state.nuevoComentario}
        />
        <TouchableOpacity onPress={() => this.onSubmit(this.state.nuevoComentario)}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}
}
export default Comments