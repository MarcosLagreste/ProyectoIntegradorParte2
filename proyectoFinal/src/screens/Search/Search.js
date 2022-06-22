import React, {Component} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native'
import { auth, db } from '../../firebase/config';
import Posts from '../../components/Posts';

class Search extends Component {
    constructor(props){
      super(props)
      this.state={
        posteos: [],
        email: '',
        encontrado: false,
      }
    }
    buscar(){
        db.collection('posts')
            .where('owner','==',this.state.email).onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                })
                    this.setState({
                        posteos: posts,
                        encontrado: true
                    },  ()=> console.log(this.state.posteos))
                })
            }
            )      
    }


render(){
    console.log(this.state)
    return (
        <View style={styles.searchContainer}>
            <Text>Search</Text>
                <TextInput 
                    style={styles.textI}
                    keyboardType='default'
                    placeholder='email completo a buscar...'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text})}
                />  
                <TouchableOpacity
                    style={styles.btn} 
                    onPress={()=>this.buscar()}
                    >
                    <Text style={ styles.btnT}>Search</Text>
                </TouchableOpacity>                         
           
            {this.state.encontrado ?
                <View style={styles.container}>
                    <Text>Search results:</Text>
                    <FlatList 
                        data={this.state.posteos}
                        keyExtractor={item=>item.id.toString()}
                        renderItem={({item}) => <Posts info={item} navigation={this.props.navigation}/> }
                    />
                </View>
                :
                    <Text style={styles.text}>El usuario no existe o aún no tiene publicaciones</Text>
            }
                   
        </View>  
    )
}
}
const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
       alignItems: 'center',
        marginTop: 20,
      },
    btn:{
        borderWidth:2,
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
      flex:5
    },
    textI:{
        height:10,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:2,
        borderColor: 'black',
        borderRadius: 6,
        marginVertical:10,
        width: '50%'
      },
      text:{
        borderWidth:2,
        borderColor: 'black',
        paddingVertical:5,
        width: 'fit-content',
        fontSize: 18,
        margin:'auto'
      }
})
export default Search