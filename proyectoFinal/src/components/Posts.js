import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../firebase/config'


class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state={
            cantLikes: 0,
            miLike: false,
            arrLikes: [],
            arrComentarios: []
        }
    }

    componentDidMount(){
        const documento = this.props.info.data
        const meGusto = documento.likes.includes(auth.currentUser.email)
        if(documento.likes){
            this.setState({
                cantLikes: documento.likes.length
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

    render(){
        
        const documento = this.props.info.data
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.postOwner}>{documento.owner}</Text>
                    <Text style={styles.postText}>{documento.description}</Text>
                </View>
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
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments')}>
                    <Text>Commentar esta publicacion</Text>
                </TouchableOpacity> */}
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
    }
   
})

export default Posts