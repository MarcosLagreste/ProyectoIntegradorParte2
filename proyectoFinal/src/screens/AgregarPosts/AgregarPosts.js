import React, {Component} from 'react'
import MyCamera from '../../components/MyCamera';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { auth, db } from '../../firebase/config';
//Cuando se cree los posteo hay que renderizar la cantidad en profile

class AgregarPosts extends Component {
  constructor(props){
      super(props)
      this.state={
        description: '',
        mostrarComponenteCamara: true,
        urlFoto: ''
        
      }
  }

  subiendoImagen(url){
    this.setState({
      urlFoto: url,
      mostrarComponenteCamara: false
    })

  }
  
  render(){
    console.log(this.props)
    return(
      <View style={styles.container}>
        <Text>Subir un nuevo Post</Text>
        {this.state.mostrarComponenteCamara ?
          <MyCamera subiendoImagen = {(url) => this.subiendoImagen(url)}  />
        :
          <>
          <Image style={styles.image}
            source={{uri: `${this.state.urlFoto}`}}
            resizeMode='contain' 
            />
          <TextInput 
              placeholder='Pie de foto'
              onChangeText={text => this.setState({description: text})}
              value={this.state.description}
          />

          <TouchableOpacity onPress={() => {
              this.props.route.params.nuevoPost(this.state.description, this.state.urlFoto)
              this.setState({description: ''})
              this.props.navigation.navigate('Home')
              }}>
            <Text>Subir</Text>
          </TouchableOpacity>
          </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 400
  }
})


export default AgregarPosts