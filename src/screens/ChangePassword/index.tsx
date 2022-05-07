import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { Input } from '../../components/Input'
import { useAuth } from '../../context/auth'
import { Modal } from '../../components/Modal'
import api from '../../services/api'
import { styles } from './styles'

export const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const { user, signOut } = useAuth()
  const email = user?.email
  const emailPaciente = user?.additionalProps1.emailPaciente
  console.log('EMAIL PACIENTE', emailPaciente)
  const realm = 'confident'

  const handleSubmit = async () => {
    setIsVisible(false)
    try {
      console.log(password)
      await api.post('signup', {
        email,
        password,
        realm,
        additionalProps1: { emailPaciente: emailPaciente },
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
      <View style={styles.divider} />
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
        <TouchableOpacity style={styles.touchable} onPress={() => signOut()}>
          <Text style={styles.textButton}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setIsVisible(true)}
        >
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        title="Confirmar nova senha"
        description="Se tem certeza que deseja salvar sua nova senha, clique em
        confirmar."
        options={[
          {
            name: 'Confirmar',
            onPress: () => handleSubmit(),
          },
        ]}
      />
    </View>
  )
}
