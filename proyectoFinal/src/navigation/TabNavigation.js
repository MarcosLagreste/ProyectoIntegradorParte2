import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import Home from '../screens/Home/Home'
import Profile from '../screens/Profile/Profile'
import AgregarPosts from '../screens/AgregarPosts/AgregarPosts'
import Search from '../screens/Search/Search'

const Tab = createBottomTabNavigator()

 function TabNavigation(props) {
 const{logout} = props.route.params

    return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Home' 
          component={Home} 
        />
        <Tab.Screen
          name='Add a new post'
          component={AgregarPosts}
          initialParams={{
            nuevoPost: (description, photo) => props.route.params.nuevoPost(description, photo)
          }}
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen 
          name='My Profile' 
          component={Profile} 
          initialParams={{
              logout: () => logout()
          }}
        />
        <Tab.Screen 
          name='Search' 
          component={Search}
        />
    </Tab.Navigator>
  )
}
export default TabNavigation