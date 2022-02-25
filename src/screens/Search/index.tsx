import React, { useState, useEffect, useCallback } from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
} from 'react-native'

import { Searchbar } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'

import {
  getPatients,
  getPatientsByDoctor,
  Patient,
} from '../../services/doctor'

import { useAuth } from '../../context/auth'
import { showMessage } from 'react-native-flash-message'
import { Feather } from '@expo/vector-icons'
import { styles } from './styles'
import api from '../../services/api'

export const Search = () => {
  const { user } = useAuth()
  const [patients, setPatients] = useState<Patient[] | []>([])
  const [originalPatients, setOriginalPatients] = useState<Patient[] | []>([])
  const [myPatients, setMyPatients] = useState<Patient[] | []>([])
  const [newPatient, setNewPatient] = useState<Patient>()
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const isFocused = useIsFocused()
  const handlePatients = async (): Promise<void> => {
    setLoading(true)

    try {
      setPatients(await getPatients())
      setOriginalPatients(await getPatients())
      setMyPatients(await getPatientsByDoctor(user?.email as string))

      console.log('PATIENTS', patients)
      console.log('MYPATIENTS', myPatients)
      console.log('ORIGINALPATIENTS', originalPatients)
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
          <TouchableOpacity onPress={() => handleAdd(item)}>
            <Feather name="plus" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  )

  const handleAdd = (item: Patient) => {
    setIsVisible(true)
    setNewPatient(item)
  }

  const handleBack = () => {
    setIsVisible(false)
    setNewPatient(undefined)
  }

  const handleConfirm = () => {
    setIsVisible(false)
    console.log('NOVO', newPatient)
    if (newPatient !== undefined) {
      if (myPatients.find(e => e.name === newPatient.name) === undefined) {
        try {
          api.post('mps', {
            emailMedico: user?.email,
            emailPaciente: newPatient.email,
          })
          showMessage({
            message: 'Confirmado!',
            description: 'Novo paciente adicionado com sucesso',
            type: 'success',
          })
          handlePatients()
        } catch (error) {
          showMessage({
            message: 'Erro!',
            description: 'Erro ao associar novo paciente',
            type: 'danger',
          })
        }
      } else {
        showMessage({
          message: 'Cuidado!',
          description: 'Paciente já associado a sua conta',
          type: 'warning',
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
        placeholder="Buscar paciente..."
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={patients}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
                Confirmar adição
              </Text>
              <Text style={{ color: '#959595', marginTop: 8 }}>
                Aperte em confirmar para concluir a associação do paciente para
                sua conta.
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
                  Voltar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#00042c',
                  borderRadius: 8,
                }}
                onPress={() => handleConfirm()}
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
