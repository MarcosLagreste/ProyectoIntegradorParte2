import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../firebase/config'
import { AntDesign } from '@expo/vector-icons'; 

class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state={
            cantLikes: 0,
            cantComments: 0,
            miLike: false,
            arrLikes: [],
            arrComentarios: []
        }
    }

    componentDidMount(){
        //console.log(this.props)
        const documento = this.props.info.data
        const meGusto = documento.likes.includes(auth.currentUser.email)
        if(documento.likes){
            this.setState({
                cantLikes: documento.likes.length
            })
        }
        if(documento.comments){
            this.setState({
                cantComments: documento.comments.length
            })
        }

        if(meGusto){
            this.setState({
                miLike: true
            })

        }
    }

    like(){
        const documento = this.props.info
        db.collection('posts')
        .doc(documento.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(response => {
            this.setState({
                miLike: true,
                cantLikes: this.state.cantLikes + 1
            })
        })
        .catch(e=> console.log(e))
    }

    unlike(){
        const documento = this.props.info
        db.collection('posts')
        .doc(documento.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(response => {
            this.setState({
                miLike: false,
                cantLikes: this.state.cantLikes - 1
            })
        })
        .catch(e=> console.log(e))
    }
    borrar(){
        const posts = this.props.info
        db.collection('posts').doc(posts.id).delete()
        .then(() => {
                console.log("Post deleted");
            }).catch((error) => {
                console.error("Error deleting post", error);
            });
    }

    render(){
        
        const documento = this.props.info.data
        //const dia = documento.createdAt
        const postOwner = documento.owner
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.postOwner}>{documento.owner}</Text>
                    {postOwner == auth.currentUser.email ?
                    <TouchableOpacity style={styles.touchB} onPress={() => this.borrar()}>
                        <AntDesign style={styles.btnD} name="delete" size={24} color="black" />
                    </TouchableOpacity>
                    :
                    <></>
                    }
                    <Image style={styles.image}
                    source={{uri: `${documento.photo}`}}
                    resizeMode='contain' 
                    />
                    <View style={styles.containerLike}>
                        <Text>Likes: {this.state.cantLikes}</Text>
                        {this.state.miLike ?
                        <TouchableOpacity onPress={()=> this.unlike()}>
                            <FontAwesome name='heart' size={24} color='red'/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <FontAwesome name='heart-o' size={24} color='black'/>
                        </TouchableOpacity>
                        }
                    </View>
                    <Text style={styles.postText}>{documento.description}</Text>
                    <Text>Comments: {this.state.cantComments}</Text>
                    {/* <Text>creation date: {dia}</Text> */}
                    <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id, pie: this.props.info.data.description})}>
                    <Text style={styles.btnT}>Coment this post</Text>
                    </TouchableOpacity>
                    
                </View>                
            </View>
            
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:8,
        paddingHorizontal:6,
        borderRadius:5,
        backgroundColor:'#F5E6E8',
        marginHorizontal:10,
        marginTop:8
    },
    postOwner:{
        flex: 2,

    },
    postText:{
        flex: 1
    },
    image: {
        height: 200,
        minWidth: 400
    },
    btn:{
        borderWidth:2,
        backgroundColor:'grey',
        paddingHorizontal:10,
      },
      btnT:{
        color: 'white',
        fontSize: 15
      },
      btnD:{
        fontSize: 30
      },
      touchB:{
        flex:1,
        width: 'fit-content'
      }
   
})

export default Posts