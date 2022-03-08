import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { SignUpDoc } from '../screens/SignUpDoc'

const { Navigator, Screen } = createNativeStackNavigator()

export const AuthRoutes = () => (
  <Navigator>
    <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    <Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerBackVisible: false,
        title: 'Cadastro de usuário',
        headerTitleAlign: 'center',
      }}
    />
    <Screen
      name="SignUpDoc"
      component={SignUpDoc}
      options={{
        headerBackVisible: false,
        title: 'Cadastro de médico',
        headerTitleAlign: 'center',
      }}
    />
  </Navigator>
)
