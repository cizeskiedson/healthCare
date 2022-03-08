import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { Searchbar } from 'react-native-paper'
import { showMessage } from 'react-native-flash-message'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useIsFocused } from '@react-navigation/native'

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
  const [isVisible2, setIsVisible2] = useState(false)
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

  const handleBack = () => {
    setIsVisible2(false)
  }

  const handlePressEdit = (item: Patient) => {
    setTimeout(() => {
      navigation.navigate('PatientData', { patient: item })
    }, 200)
  }

  const handlePressDelete = (item: Patient) => {
    setIsVisible2(true)
    setDelPatient(item)
  }

  const handleDelete = async () => {
    setIsVisible2(false)
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

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setIsVisible(true)}
      >
        <Feather
          name="plus"
          style={{
            fontSize: 17,
            color: '#1dd3f8',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          Adicionar novo paciente
        </Feather>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        transparent
        style={{}}
        onRequestClose={() => setIsVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 14,
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: 14,
              borderRadius: 8,
            }}
          >
            <View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                Associar novo paciente
              </Text>
              <Text style={{ color: '#959595', marginTop: 8 }}>
                Precisamos que informe se deseja buscar um usuário no sistema,
                ou se deseja cadastrar um novo paciente.
              </Text>

              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#D9D9D9',
                  marginVertical: 20,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#1dd3f8',
                  borderRadius: 8,
                }}
                onPress={() => navigateToSearch()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#00042c',
                  }}
                >
                  Buscar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#00042c',
                  borderRadius: 8,
                }}
                onPress={() => navigateToSignUp()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#1dd3f8',
                  }}
                >
                  Novo paciente
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isVisible2}
        transparent
        style={{}}
        onRequestClose={() => setIsVisible2(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 14,
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: 14,
              borderRadius: 8,
            }}
          >
            <View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                Remover paciente
              </Text>
              <Text style={{ color: '#959595', marginTop: 8 }}>
                Por favor, confirme a remoção do usuário de sua lista de
                pacientes.
              </Text>

              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#D9D9D9',
                  marginVertical: 20,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#1dd3f8',
                  borderRadius: 8,
                }}
                onPress={() => handleBack()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#00042c',
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#00042c',
                  borderRadius: 8,
                }}
                onPress={() => handleDelete()}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#1dd3f8',
                  }}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
