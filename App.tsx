import React from 'react'
import FlashMessage from 'react-native-flash-message'

import { AuthProvider } from './src/context/auth'
import { Routes } from './src/routes'

const App = () => (
  <AuthProvider>
    <Routes />
    <FlashMessage position="bottom" />
  </AuthProvider>
)

export default App
