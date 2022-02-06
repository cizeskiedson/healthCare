import React from 'react'
import { AuthProvider } from './src/context/auth'
import { Routes } from './src/routes'

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
)

export default App
