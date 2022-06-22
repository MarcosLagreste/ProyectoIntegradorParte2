import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../../firebase/config'
import Posts from '../../components/Posts'


class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      posteos: [],
      loading: true
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        this.setState({
          posteos: posts,
          loading: false
        })//, ()=> console.log(this.state.posteos))  
        })
      }
    )
  }


  render(){
    return (
      <View style={styles.container}>
       <Text style={styles.text}>Latest posts:</Text>
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
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Home