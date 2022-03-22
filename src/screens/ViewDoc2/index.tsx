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
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Modal } from '../../components/Modal'
import { useAuth } from '../../context/auth'
import { getPatientsByDoctor, Patient } from '../../services/doctor'
import { styles } from './styles'
import api from '../../services/api'

export type Mp = {
  id: string
  emailPaciente: string
  emailMedico: string
}

export const ViewDoc2 = () => {
  const { user } = useAuth()

  const [patients, setPatients] = useState<Patient[] | []>([])
  const [originalPatients, setOriginalPatients] = useState<Patient[] | []>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [delPatient, setDelPatient] = useState<Patient>()
  const isFocused = useIsFocused()
  const navigation = useNavigation()

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
          <TouchableOpacity onPress={() => handlePressEdit(item)}>
            <Feather name="external-link" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() => handlePressDelete(item)}
          >
            <Feather name="trash" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  )

  const navigateToSearch = () => {
    setIsVisible(false)

    setTimeout(() => {
      navigation.navigate('Search')
    }, 200)
  }
  const navigateToSignUp = () => {
    setIsVisible(false)

    setTimeout(() => {
      navigation.navigate('CreatePatient')
    }, 200)
  }

  const handlePressEdit = (item: Patient) => {
    setTimeout(() => {
      navigation.navigate('PatientData', { email: item.email })
    }, 200)
  }

  const handlePressDelete = (item: Patient) => {
    setIsVisible(true)
    setDelPatient(item)
  }

  const handleDelete = async () => {
    setIsVisible(false)
    if (delPatient !== undefined) {
      try {
        const response = await api.get('mps')
        const data = response.data
        console.log('DATA', data)
        const toRemove = data.find(
          (e: Mp) =>
            e.emailPaciente === delPatient.email &&
            e.emailMedico === user?.email
        )
        if (toRemove !== undefined) {
          await api.delete(`mps/${toRemove.id}`)
          showMessage({
            message: 'Sucesso!',
            description: 'Remoção feita com êxito',
            type: 'success',
          })
          handlePatients()
        }
      } catch (error) {
        showMessage({
          message: 'Oops!',
          description: 'Não foi possível remover o paciente',
          type: 'danger',
        })
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      console.log('called')
      handlePatients()
    }
  }, [isFocused])

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

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigateToSignUp()}
        >
          <Text style={styles.textNew}>Novo paciente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigateToSearch()}
        >
          <Text style={styles.textSearch}>Buscar usuário</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        title="Remover paciente"
        description="Por favor, confirme a remoção do usuário de sua lista de
        pacientes."
        options={[
          {
            name: 'Confirmar',
            onPress: () => handleDelete(),
          },
        ]}
      />
    </View>
  )
}
