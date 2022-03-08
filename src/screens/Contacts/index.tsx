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
import { getContactsByPatient, Contact } from '../../services/patient'
import { styles } from './styles'
import api from '../../services/api'
import { colors } from 'react-native-elements'

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
        <Text style={styles.text}>Adicionar novo contato</Text>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        title="Remover contato"
        description="Por favor, confirme a remoção do usuário de sua lista de
        contatos."
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
