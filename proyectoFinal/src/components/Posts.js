import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../firebase/config'


class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        
        const documento = this.props.info.data
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.messageOwner}>{documento.owner}</Text>
                    <Text style={styles.messageText}>{documento.posts}</Text>
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
   
})

export default Posts