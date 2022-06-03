import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import Home from '../screens/Home/home'
import Profile from '../screens/Profile/profile'

const Tab = createBottomTabNavigator()

 function TabNavigation(props) {
 // const{logout} = props.route.params
  
    return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        initialParams={{
            logout: () => logout()
        }}
        />
    </Tab.Navigator>
  )
}
export default TabNavigation