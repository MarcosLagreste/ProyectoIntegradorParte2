import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {storage} from '../firebase/config'

class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state={
            mostrarCamara: true,
            permisos: false,
            urlFoto: ''
        }
        this.metodosDeCamara = undefined
    }

  componentDidMount(){
      Camera.requestCameraPermissionsAsync()
      .then(response => this.setState({
        permisos: true,
        urlFoto: ''
      }))
      .catch(error => console.log(error))
  }  

  sacarFoto(){
      this.metodosDeCamara.takePictureAsync()
      .then(foto => this.setState({ //si haces el console log de response me va a dar un objeto que es lo que voy a llamar "foto" que tiene adentro a uri y mas cosas.
        urlFoto: foto.uri,
        mostrarCamara: false
      }))
      .catch(error => console.log(error))
  }

  aceptarFoto(){
    fetch(this.state.urlFoto)
      .then(response => response.blob())
      .then(imagen => {
        const ref = storage.ref(`fotos/${Date.now()}.jpg`)
        ref.put(imagen)  //Hasta aca subi la foto a firestore a la carpeta fotos. Ahora ya empiezo a traerla.
        .then(reponse => {
          ref.getDownloadURL()
          .then(urlLista => {
            this.props.subiendoImagen(urlLista)
          })
          .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))

  }

  rechazarFoto(){
    this.setState({
      urlFoto: '',
      mostrarCamara: true
    })

  }

  render() {
    return (
      <View style={styles.container}>
          {this.state.permisos ?
            this.state.mostrarCamara === false ?
              <>
                <Image 
                  style={styles.camera}
                  source={{uri: this.state.urlFoto}}
                />
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => this.aceptarFoto()}>
                    <Text>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.rechazarFoto()}>
                    <Text>Rechazar</Text>
                  </TouchableOpacity>
                </View>
              </>
            :
              <>
                <Camera
                  style={styles.camera}
                  type={Camera.Constants.Type.back}
                  ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.sacarFoto()}>
                        <Text>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
              </>
        
          : 
          <Text>Lo siento, no tienes permiso para usar la camara</Text>
          }
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 9
    },
    buttons: {
        flex: 1
    }
})
export default MyCamera