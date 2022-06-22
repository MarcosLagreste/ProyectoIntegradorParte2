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
      .then(foto => this.setState({ //el console log de response me va a dar un objeto que es lo que voy a llamar "foto" que tiene adentro a uri y mas cosas.
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
          ref.getDownloadURL() //Descarga la ruta en donde guardo la imagen
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
                <View style={styles.buttons2}>
                  <TouchableOpacity style={styles.btn} onPress={() => this.aceptarFoto()}>
                    <Text style={styles.btnT1}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onPress={() => this.rechazarFoto()}>
                    <Text style={styles.btnT1}>Decline</Text>
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
                    <TouchableOpacity style={styles.btn} onPress={() => this.sacarFoto()}>
                        <Text style={styles.btnT}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
              </>
        
          : 
          <Text style={styles.text}>Sorry, you don't have permission to access the camera</Text>
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
    },
    btn:{
      borderWidth:1,
      borderRadius:5,
      backgroundColor:'black',
      paddingVertical:6,
      paddingHorizontal:8,
      marginHorizontal:'auto',
      textAlign: 'center',
      width: 'fit-content'
    },
    btnT:{
      color: 'white',
      fontSize: 20
    },
    btn2:{
      borderWidth:1,
      borderRadius:5,
      backgroundColor:'black',
      marginHorizontal:'auto',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      width: 'fit-content'
    },
    btnT1:{
      color: 'azure',
      fontSize: 20,
    },
    buttons2: {
      flex: 2
  },
  text:{
    padding: 10,
    fontSize: 16,
    color: 'crimson',
  }
})
export default MyCamera