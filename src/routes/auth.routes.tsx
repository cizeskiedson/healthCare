import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()

export const AuthRoutes = () => (
  <Navigator>
    <Screen
      name="SignIn"
      component={SignIn}
      options={{ title: 'Login', headerTitleAlign: 'center' }}
    />
    <Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerBackVisible: false,
        title: 'Cadastro de usuário',
        headerTitleAlign: 'center',
      }}
    />
  </Navigator>
)
