import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import Home from '../screens/Home/Home' //importo screens
import Profile from '../screens/Profile/Profile'
import AgregarPosts from '../screens/AgregarPosts/AgregarPosts'
import Search from '../screens/Search/Search'
import { Octicons } from '@expo/vector-icons'; //importo los iconos
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
          name='Search' //Nombre de la screen
          component={Search}//renderizo la screen
          options={{tabBarIcon:() => <FontAwesome name="search" size={24} color="black" />}}//renderizo el icono que importe
        />
        <Tab.Screen 
          name='My Profile' 
          component={Profile} 
          initialParams={{ //parametros que le paso desde stack hacia el nieto profile
              logout: () => logout()
          }}
          options={{tabBarIcon:() => <FontAwesome name="user-circle-o" size={24} color="black" />}}
        />
        
    </Tab.Navigator>
  )
}
export default TabNavigation