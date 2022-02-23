import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Searchbar } from 'react-native-paper'
import { showMessage } from 'react-native-flash-message'
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../context/auth'
import { getPatientsByDoctor, Patient } from '../../services/doctor'
import { styles } from './styles'

export const ViewDoc2 = () => {
  const { user } = useAuth()

  const [patients, setPatients] = useState<Patient[] | []>([])
  const [originalPatients, setOriginalPatients] = useState<Patient[] | []>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handlePatients = async (): Promise<void> => {
    setLoading(true)

    try {
      setPatients(await getPatientsByDoctor(user?.email as string))
      setOriginalPatients(await getPatientsByDoctor(user?.email as string))
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível carregar os pacientes',
        type: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const keyExtractor = useCallback((item: Patient) => String(item.cpf), [])

  const renderItem = useCallback(
    ({ item }: { item: Patient }) => (
      <View style={styles.card}>
        <View>
          <View style={styles.cardTitle}>
            <Text style={styles.descriptionBold}>Nome: </Text>
            <Text style={styles.description}>{item.name}</Text>
          </View>

          <View style={styles.cardTitle}>
            <Text style={styles.descriptionBold}>Idade: </Text>
            <Text style={styles.description}>{item.age} anos</Text>
          </View>

          <View style={styles.cardTitle}>
            <Text style={styles.descriptionBold}>E-mail: </Text>
            <Text style={styles.description}>{item.email}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity>
            <Feather name="external-link" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 8 }}>
            <Feather name="trash" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  )

  useEffect(() => {
    handlePatients()
  }, [])

  useEffect(() => {
    if (searchText === '') {
      setPatients(originalPatients)
    } else {
      setPatients(
        patients.filter(
          item =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            item.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      )
    }
  }, [searchText])

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar pacientes..."
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />

      <FlatList
        data={patients}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  )
}
