// Lavindu Devadithya

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './App/Screens/HomeScreen'
import StateDataScreen from './App/Screens/StateDataScreen'
import { strings } from './App/Constants/lang'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: strings.home_title}}
        />
        <Stack.Screen
          name="State Data"
          component={StateDataScreen}
          options={{title: strings.state_title}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App