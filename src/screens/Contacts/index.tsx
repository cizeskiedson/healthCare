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
import { getContactsByPatient, Contact } from '../../services/patient'
import { styles } from './styles'
import api from '../../services/api'

export type Pc = {
  id: string
  emailPaciente: string
  emailConfianca: string
}

export const Contacts = () => {
  const { user } = useAuth()

  const [contacts, setContacts] = useState<Contact[] | []>([])
  const [originalContacts, setOriginalContacts] = useState<Contact[] | []>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [delContact, setDelContact] = useState<Contact>()
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const handlePatients = async (): Promise<void> => {
    setLoading(true)

    try {
      setContacts(await getContactsByPatient(user?.email as string))
      setOriginalContacts(await getContactsByPatient(user?.email as string))
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível carregar os seus contatos',
        type: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const keyExtractor = useCallback((item: Contact) => String(item.cpf), [])

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
      <View style={styles.card}>
        <View>
          <View style={styles.cardTitle}>
            <Text style={styles.descriptionBold}>Nome: </Text>
            <Text style={styles.description}>{item.name}</Text>
          </View>

          <View style={styles.cardTitle}>
            <Text style={styles.descriptionBold}>E-mail: </Text>
            <Text style={styles.description}>{item.email}</Text>
          </View>
        </View>
        {item.type === 'contact' ? (
          <View style={styles.actions}>
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={() => handlePressDelete(item)}
            >
              <Feather name="trash" size={22} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    ),
    []
  )

  const navigateToSignUp = () => {
    setIsVisible(false)

    setTimeout(() => {
      navigation.navigate('CreateContact')
    }, 200)
  }

  const handleBack = () => {
    setIsVisible(false)
  }

  const handlePressEdit = (item: Contact) => {
    setTimeout(() => {
      navigation.navigate('ViewPatientData')
    }, 200)
  }

  const handlePressDelete = (item: Contact) => {
    setIsVisible(true)
    setDelContact(item)
  }

  const handleDelete = async () => {
    setIsVisible(false)
    if (delContact !== undefined) {
      try {
        const response = await api.get('pcs')
        const data = response.data
        console.log('DATA', data)
        const toRemove = data.find(
          (e: Pc) =>
            e.emailPaciente === user?.email &&
            e.emailConfianca === delContact.email
        )
        if (toRemove !== undefined) {
          await api.delete(`pcs/${toRemove.id}`)
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
          description: 'Não foi possível remover o contato',
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
      setContacts(originalContacts)
    } else {
      setContacts(
        contacts.filter(
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
        placeholder="Buscar contatos..."
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />

      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigateToSignUp()}
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
          Adicionar novo contato
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
                Remover contato
              </Text>
              <Text style={{ color: '#959595', marginTop: 8 }}>
                Por favor, confirme a remoção do usuário de sua lista de
                contatos.
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
