import React from 'react'
import { Text } from 'react-native'
import { useAuth } from '../../context/auth'

export const Resume = () => {
  const { signOut } = useAuth()

  return <Text onPress={() => signOut()}>Resumo</Text>
}
