import React from 'react'
import { Button } from 'react-native-elements'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import { styles } from './styles'

export const SignUpDoc = () => {
  const navigation = useNavigation()
  const handleSubmit = () => {
    console.log('teste')
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Input name="name" label="Nome" placeholder="Digite seu nome" />
        <Input
          name="cpf"
          label="CPF"
          placeholder="Digite seu CPF"
          maxLength={11}
          keyboardType="numeric"
        />
        <Input
          name="crm"
          label="CRM"
          placeholder="Digite seu CRM"
          maxLength={11}
          keyboardType="numeric"
        />
        <Input name="email" label="E-mail" placeholder="Digite seu email" />

        <Input
          name="phone"
          label="Telefone"
          placeholder="Digite seu telefone"
          maxLength={11}
          keyboardType="numeric"
        />

        <Input
          name="area"
          label="Área de Atuação"
          placeholder="Digite sua área de atuação"
          secureTextEntry
        />
        <Input
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
        />
      </ScrollView>
      <View style={styles.options}>
        <Button
          title={'Voltar ao login'}
          type="clear"
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Button title="Salvar" onPress={() => handleSubmit()} />
      </View>
    </View>
  )
}
