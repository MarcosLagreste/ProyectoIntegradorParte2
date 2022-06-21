import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import Home from '../screens/Home/Home'
import Profile from '../screens/Profile/Profile'
import AgregarPosts from '../screens/AgregarPosts/AgregarPosts'
import Search from '../screens/Search/Search'
import { Octicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

 function TabNavigation(props) {
 const{logout} = props.route.params

    return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Home' 
          component={Home}
          options={{tabBarIcon:() => <FontAwesome5 name="home" size={24} color="black" />}}
        />
        <Tab.Screen
          name='Add a new post'
          component={AgregarPosts}
          initialParams={{
            nuevoPost: (description, photo) => props.route.params.nuevoPost(description, photo)
          }}
          options={{unmountOnBlur: true, tabBarIcon:() => <Octicons name="diff-added" size={24} color="black" />}}
        />
        <Tab.Screen 
          name='Search' 
          component={Search}
          options={{tabBarIcon:() => <FontAwesome name="search" size={24} color="black" />}}
        />
        <Tab.Screen 
          name='My Profile' 
          component={Profile} 
          initialParams={{
              logout: () => logout()
          }}
          options={{tabBarIcon:() => <FontAwesome name="user-circle-o" size={24} color="black" />}}
        />
        
    </Tab.Navigator>
  )
}
export default TabNavigation