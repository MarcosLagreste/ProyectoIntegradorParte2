import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import Home from '../screens/Home/Home'
import Profile from '../screens/Profile/Profile'

const Tab = createBottomTabNavigator()

 function TabNavigation(props) {
 const{logout} = props.route.params
  console.log(props);
    return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        initialParams={{
            logout: (Out) => logout(Out)
        }}
        />
    </Tab.Navigator>
  )
}
export default TabNavigation