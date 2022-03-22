import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useAuth } from '../../context/auth'
import api from '../../services/api'
import { Contact, getContactsByPatient, Patient } from '../../services/patient'
import { alertMessage, AlertProps } from '../../utils/emergency'

import { styles } from './styles'

export type Mensagem = {
  email: string
  subject: string
  html: string
}

export const Resume = () => {
  const { signOut, user } = useAuth()
  const [contacts, setContacts] = useState<Contact[] | []>([])
  const [emergency, setEmergency] = useState(false)
  const [data, setData] = useState<Patient>()

  useEffect(() => {
    if (emergency) {
      console.log('email', user?.email as string)
      sendEmail(user?.email as string)
    }
    setEmergency(false)
  }, [emergency])

  const getPatientData = async (email: string) => {
    const id = email
    try {
      const response = await api.get(`pacientes/${id}`)
      setData(response.data)
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível carregar os dados do paciente.',
        type: 'danger',
      })
    }
  }

  const sendEmail = async (email: string) => {
    try {
      await getPatientData(email)
      setContacts(await getContactsByPatient(email))
      contacts.forEach(contact => {
        console.log(contact.email)
        alertMessage({
          email: contact.email,
          name: data?.name as string,
          local: 'Localização do paciente aqui...',
          bpm: 'Ultimos dados do BPM aqui...',
          atividade: 'Ultimos dados de atividade aqui...',
          oxigenio: 'Ultimos dados de oxigenio aqui...',
        })
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível enviar o email de emergência.',
        type: 'danger',
      })
    }
  }

  const handleClick = async () => {
    setEmergency(true)
  }

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
