import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/auth'

import { styles } from './styles'

export type Mensagem = {
  email: string
  subject: string
  html: string
}

export const Resume = () => {
  const { signOut, user } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Batimentos Cardíacos</Text>
        <View style={styles.box}>
          <Text style={styles.input}>Dados do batimento cardíaco aqui...</Text>
        </View>
        <Text style={styles.header}>Nível de Oxigênio no Sangue </Text>
        <View style={styles.box}>
          <Text style={styles.input}>
            Dados do nível de oxigênio no sangue aqui...
          </Text>
        </View>
        <Text style={styles.header}>Atividade</Text>
        <View style={styles.box}>
          <Text style={styles.input}>
            Dados sobre atividades recentes aqui...
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleClick()}>
        <Text style={styles.buttonText}>Estado de alerta</Text>
      </TouchableOpacity>
    </View>
  )
}
