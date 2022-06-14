import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { auth, db } from '../../firebase/config';
//Cuando se cree los posteo hay que renderizar la cantidad en profile
class Posts extends Component {
    constructor(props){
        super(props)
        this.state={
          description: '',
          likes: '',
          comments: '',
          photo: ''
          
        }
      }

    nuevoPost(description){
      db.collection('posts').add({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          description: description,
          photo: ''
        
      })
      .then()
      .catch(e=> console.log(e))
    }
    

    render(){
      return (
        <View>
          <Text>Subir un nuevo Post</Text>

          <Image />

          <TextInput 
            placeholder='Pie de foto'
            onChangeText={text => this.setState({description: text})}
            value={this.state.description}
          />

          <TouchableOpacity onPress={() => {
            this.nuevoPost(this.state.description)
            this.setState({description: ''})
            }} >
            <Text>Subir</Text>
          </TouchableOpacity>
            


        </View>
      )
}
}
export default Posts