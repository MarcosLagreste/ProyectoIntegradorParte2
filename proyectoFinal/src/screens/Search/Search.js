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
        <View style={styles.container}>
            <Text>Search</Text>
            <View style={styles.searchContainer}>
                        <TextInput 
                            style={styles.TextI}
                            keyboardType='default'
                            placeholder='email a buscar...'
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text})}
                        />  
                        <TouchableOpacity
                            style={styles.btn} 
                            onPress={()=>this.buscar()}
                            >
                            <Text style={ styles.btnT}>Search</Text>
                        </TouchableOpacity>                         
            </View>
            {this.state.encontrado ?
                <View>
                    <Text>Search results:</Text>
                    <FlatList 
                        data={this.state.posteos}
                        keyExtractor={item=>item.id.toString()}
                        renderItem={({item}) => <Posts info={item} navigation={this.props.navigation}/> }
                    />
                </View>
                :
                        <Text>El usuario no existe o no hay posteos del mismo</Text>
                    }
                   
        </View>
    )
}
}
const styles = StyleSheet.create({
    nombrePagina:{
      borderWidth:1,
      fontSize: 18
    },
    searchContainer: {
        height: '100px',
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
       alignItems: 'center',
        width: "200px%",
        paddingHorizontal:10,
        marginTop: 20,
      },
    email:{
      borderWidth:1,
      paddingVertical:10,
      fontSize: 18
    },
    userN:{
      borderWidth:1,
      paddingVertical:10,
      textTransform: 'capitalize',
      fontSize: 18
    },
    day:{
      borderWidth:1,
      paddingVertical:10,
      fontSize: 18
    },
    btn:{
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'black',
        paddingVertical:6,
        paddingHorizontal:8,
        marginHorizontal:'auto',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        width: '50%'
    },
    btnT:{
      color: 'white',
      fontSize: 20
    },
    container:{
      flex:1
    },
    textI:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        width: '50%'
      }
})
export default Search