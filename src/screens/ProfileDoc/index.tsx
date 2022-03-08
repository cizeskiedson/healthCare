import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'

import { Modal } from '../../components/Modal'

import { Input } from '../../components/Input'
import api from '../../services/api'
import { styles } from './styles'
import { useAuth } from '../../context/auth'
import { Feather } from '@expo/vector-icons'

import { useIsFocused } from '@react-navigation/native'

import { Doctor } from '../../services/doctor'

import { showMessage } from 'react-native-flash-message'

export const ProfileDoc = () => {
  const { user } = useAuth()

  const [data, setData] = useState<Doctor>()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('')
  const [edit, setEdit] = useState(false)
  const { signOut } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const isFocused = useIsFocused()

  const handleOnFillForms = async () => {
    try {
      const url = '/medicos/' + user?.email
      const response = await api.get(url)
      console.log('RESPONSE', response.data)
      setData(response.data)
      setName(response.data.name)
      setPhone(response.data.phone)
      setArea(response.data.area)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isFocused) {
      handleOnFillForms()
    }
  }, [])

  useEffect(() => {
    if (!edit) {
      handleOnFillForms()
    }
  }, [edit])
  const handleOnSave = async () => {
    try {
      await api.patch(`/medicos/${user?.email}`, {
        name: name,
        phone: phone,
        area: area,
      })
      showMessage({
        message: 'Sucesso!',
        description: 'Novas informações salvas com sucesso!',
        type: 'success',
      })
      setEdit(false)
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível editar seus dados',
        type: 'danger',
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 80,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => {
            edit ? setEdit(false) : setEdit(true)
          }}
        >
          <Feather
            name="edit"
            style={{
              fontSize: 16,
              color: '#000',
              letterSpacing: 0.1,
            }}
          >
            {edit ? 'Cancelar' : 'Editar'}
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!edit}
          style={{
            backgroundColor: '#fff',
            width: 80,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => handleOnSave()}
        >
          <Feather
            name="save"
            style={
              edit
                ? {
                    fontSize: 16,
                    color: '#000',
                    letterSpacing: 0.1,
                  }
                : {
                    fontSize: 16,
                    color: '#9d9d9d',
                    letterSpacing: 0.1,
                    opacity: 10,
                  }
            }
          >
            Salvar
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => setIsVisible(true)}
        >
          <Feather
            name="log-out"
            style={{
              fontSize: 16,
              color: '#D9534F',
              alignSelf: 'center',
              letterSpacing: 0.1,
            }}
          >
            Sair
          </Feather>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }}>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            editable={edit}
            value={name}
            onChangeText={value => setName(value)}
          />
          <Input
            name="cpfString"
            label="CPF"
            placeholder="Digite seu cpf"
            maxLength={11}
            keyboardType="numeric"
            editable={false}
            value={data?.cpf}
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            editable={false}
            value={data?.email}
          />

          <Input
            name="crm"
            label="CRM"
            placeholder="Digite seu CRM"
            editable={false}
            value={data?.crm}
          />

          <Input
            name="phone"
            label="Telefone"
            placeholder="Digite seu telefone"
            maxLength={11}
            keyboardType="numeric"
            editable={edit}
            value={phone}
            onChangeText={value => setPhone(value)}
          />
          <Input
            name="area"
            label="Area"
            placeholder="Digite sua área"
            editable={edit}
            value={area}
            onChangeText={value => setArea(value)}
          />
        </ScrollView>
        <Modal
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          title="Tem certeza que deseja sair?"
          description="Caso queira, você retornará a tela inicial do aplicativo."
          options={[
            {
              name: 'Sair',
              onPress: () => signOut(),
            },
          ]}
        />
      </View>
    </View>
  )
}
