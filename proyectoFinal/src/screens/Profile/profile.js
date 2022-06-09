import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Profile(props) {
  console.log(props.route);
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={(Out)=> props.route.params.logout(Out)}>
          <Text>
              Cerrar sesion
          </Text>
      </TouchableOpacity>
    </View>
  )
}