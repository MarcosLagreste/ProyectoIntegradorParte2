import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'



class Home extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  render(){
    return (
      <View style={styles.container}>
       <Text>Estos son los posts recientes:</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default Home