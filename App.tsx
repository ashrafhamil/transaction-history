import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screens/LoginScreen'
import TransactionHistoryScreen from './src/screens/TransactionHistroyScreen'
import TransactionDetailScreen from './src/screens/TransactionDetailScreen'

export type RootStackParamList = {
  Login: undefined
  History: undefined
  Detail: { transactionId: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="History" component={TransactionHistoryScreen} />
        <Stack.Screen name="Detail" component={TransactionDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
