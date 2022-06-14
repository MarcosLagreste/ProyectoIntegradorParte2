import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../../firebase/config'


class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      posteos: []
    }
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(
      docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        this.setState({
          posteos: posts
        }, ()=> console.log(this.state.posteos))  
        })
      }
    )
  }


  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Posts')}>
          <Text>Agregar Post</Text>
        </TouchableOpacity>

       <Text>Estos son los posts recientes:</Text>
       <FlatList 
          data={this.state.posteos}
          keyExtractor={item=>item.id.toString()}
          renderItem={({item}) => <Text>{item.data.description}</Text>}
          />
       
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