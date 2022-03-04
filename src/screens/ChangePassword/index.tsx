import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Modal } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { Input } from '../../components/Input'
import { useAuth } from '../../context/auth'
import api from '../../services/api'
import { styles } from './styles'

export const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const { user, signOut } = useAuth()
  const email = user?.email
  const realm = 'confident'

  const handleSubmit = async () => {
    setIsVisible(false)
    try {
      console.log(password)
      await api.post('signup', {
        email,
        password,
        realm,
      })
      showMessage({
        message: 'Sucesso!',
        description: 'Senha alterada com sucesso',
        type: 'success',
      })
      signOut()
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível alterar sua senha',
        type: 'danger',
      })
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Para concluir seu cadastro como contato de confiança, digite sua nova
        senha. Seu usuário permanecerá sendo o email cadastrado.{' '}
      </Text>
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#D9D9D9',
          marginVertical: 10,
        }}
      />
      <View style={styles.password}>
        <Input
          name="password"
          label="Senha"
          placeholder="Digite sua nova senha"
          secureTextEntry
          onChangeText={value => setPassword(value)}
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
          onPress={() => signOut()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#00042c',
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: '#00042c',
            borderRadius: 8,
          }}
          onPress={() => setIsVisible(true)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#1dd3f8',
            }}
          >
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
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
                Confirmar nova senha
              </Text>
              <Text style={{ color: '#959595', marginTop: 8 }}>
                Se tem certeza que deseja salvar sua nova senha, clique em
                confirmar.
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
                  backgroundColor: '#00042c',
                  borderRadius: 8,
                }}
                onPress={() => handleSubmit()}
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
