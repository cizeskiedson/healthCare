import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native'

import { Input } from '../../components/Input'
import api from '../../services/api'
import { styles } from './styles'
import { useAuth } from '../../context/auth'
import { Feather } from '@expo/vector-icons'

export const ProfileDoc = () => {
  const { user } = useAuth()
  const handleOnFillForms = async () => {
    let email = ''
    if (user != null) {
      email = user.email
    }
    try {
      const url = '/medicos/' + email
      const response = await api.get(url)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnSave = async () => null

  const [data, setData] = useState(false)
  const [edit, setEdit] = useState(false)
  const { signOut } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  handleOnFillForms()

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
            }}
          >
            {edit ? 'Cancelar' : 'Editar'}
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 70,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => {
            edit ? handleOnSave() : null
          }}
        >
          <Feather
            name="save"
            style={{
              fontSize: 16,
              color: '#000',
            }}
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
            }}
          ></Feather>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }}>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            editable={edit}
            value={data.name}
          />
          <Input
            name="cpfString"
            label="CPF"
            placeholder="Digite seu cpf"
            maxLength={11}
            keyboardType="numeric"
            editable={edit}
            value={data.cpf}
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            editable={edit}
            value={data.email}
          />

          <Input
            name="crm"
            label="CRM"
            placeholder="Digite seu CRM"
            editable={edit}
            value={data.crm}
          />

          <Input
            name="phone"
            label="Telefone"
            placeholder="Digite seu telefone"
            maxLength={11}
            keyboardType="numeric"
            editable={edit}
            value={data.phone}
          />
          <Input
            name="area"
            label="Area"
            placeholder="Digite sua área"
            editable={edit}
            value={data.area}
          />
        </ScrollView>
        <Modal visible={isVisible} transparent style={{}}>
          <View style={styles.containerModal}>
            <View style={styles.backgroundModal}>
              <View>
                <Text style={styles.textBold}>Tem certeza que quer sair?</Text>
                <Text style={styles.text}>
                  Caso queira, você retornará a tela inicial do aplicativo.
                </Text>

                <View style={styles.divModal} />
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
                  onPress={() => setIsVisible(false)}
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
                    backgroundColor: '#D9534F',
                    borderRadius: 8,
                  }}
                  onPress={signOut}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#00042c',
                    }}
                  >
                    Sim
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
