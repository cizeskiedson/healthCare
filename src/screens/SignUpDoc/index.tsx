import React from 'react'
import { Button } from 'react-native-elements'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { styles } from './styles'

type FormProps = {
  name: string
  cpf: string
  crm: string
  email: string
  phone: string
  area: string
  password: string
}

export const SignUpDoc = () => {
  const navigation = useNavigation()
  const handleSubmit = () => {
    console.log('teste')
  }
  const formik = useFormik<FormProps>({
    initialValues: {
      name: '',
      cpf: '',
      crm: '',
      email: '',
      phone: '',
      area: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      crm: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CRM inválido.')
        .required('CRM é um campo obrigatório.'),
      email: Yup.string().required(),
      phone: Yup.string(),
      area: Yup.string(),
      password: Yup.string().required(),
    }),
    onSubmit: () => handleSubmit(),
  })

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
          formik={formik}
        />
        <Input
          name="crm"
          label="CRM"
          placeholder="Digite seu CRM"
          maxLength={11}
          keyboardType="numeric"
          formik={formik}
        />
        <Input name="email" label="E-mail" placeholder="Digite seu email" />

        <Input
          name="phone"
          label="Telefone"
          placeholder="Digite seu telefone"
          maxLength={11}
          keyboardType="numeric"
          formik={formik}
        />

        <Input
          name="area"
          label="Área de Atuação"
          placeholder="Digite sua área de atuação"
          secureTextEntry
          formik={formik}
        />
        <Input
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry
          formik={formik}
        />
      </ScrollView>
      <View style={styles.options}>
        <Button
          title={'Voltar ao login'}
          type="clear"
          titleStyle={{ color: '#00042c' }}
          onPress={() => {
            navigation.goBack()
          }}
        />
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: '#1dd3f8',
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#00042c',
              alignSelf: 'center',
            }}
          >
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
