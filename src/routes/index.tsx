import React from 'react'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { UserType } from '../screens/SignIn'

import { useAuth } from '../context/auth'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined
      SignUp: { userType: UserType }
      SignUpDoc: { userType: UserType }
      Resume: undefined
      History: undefined
      Profile: undefined
      ProfileDoc: undefined
      ViewDoc: undefined
      ViewConfianca: undefined
      Search: undefined
    }
  }
}

export const Routes = () => {
  const { signed, loading, user } = useAuth()
  if (loading) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      {signed ? (
        <AppRoutes id={user ? user.id : ''} realm={user ? user.realm : ''} />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  )
}
