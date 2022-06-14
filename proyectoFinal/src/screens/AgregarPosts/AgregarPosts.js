import React, {Component} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { auth, db } from '../../firebase/config';
//Cuando se cree los posteo hay que renderizar la cantidad en profile

class AgregarPosts extends Component {
  constructor(props){
      super(props)
      this.state={
        description: ''
        
      }
    }

  
    render(){
      console.log(this.props)
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
            this.props.route.params.nuevoPost(this.state.description)
            this.setState({description: ''})
            }} >
            <Text>Subir</Text>
          </TouchableOpacity>
            


        </View>
  )
}
}
export default AgregarPosts