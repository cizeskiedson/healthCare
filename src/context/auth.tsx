import React, { useState, useEffect, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'

import { User, AuthContextProps } from '../types'

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadStoragedData = async () => {
    const storagedUser = await AsyncStorage.getItem('@healthCare:user')
    const storagedToken = await AsyncStorage.getItem('@healthCate:token')

    if (storagedUser && storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`
      setUser(JSON.parse(storagedUser))
    }

    setLoading(false)
  }

  useEffect(() => {
    loadStoragedData()
  }, [])

  const signIn = async (email: string, password: string) => {
    const {
      data: { user, token },
    } = await api.post('users/login', { email, password })
    console.log(user)
    setUser(user)

    api.defaults.headers.Authorization = `Bearer ${token}`

    await AsyncStorage.setItem('@healthCare:user', JSON.stringify(user))
    await AsyncStorage.setItem('@healthCate:token', token)
  }

  const signOut = async () => {
    await AsyncStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => useContext(AuthContext)
