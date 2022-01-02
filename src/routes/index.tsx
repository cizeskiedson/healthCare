import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined
      SignUp: undefined
      Resume: undefined
      History: undefined
      Profile: undefined
    }
  }
}

export const Routes = () => (
  <NavigationContainer>
    <AuthRoutes />
    {/* 
    <AppRoutes /> */}
  </NavigationContainer>
)
