import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { styles } from './styles'

import api from '../../services/api'
import { showMessage } from 'react-native-flash-message'

import { validate } from 'gerador-validador-cpf'

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

  const { signIn } = useAuth()

  const [error, setError] = useState(false)

  const handleOnSubmit = async (values: FormProps) => {
    console.log('teste')
    const { name, cpf, crm, email, phone, area, password } = values
    const realm = 'doctor'
    try {
      await api.post('signup', {
        email,
        password,
        realm,
      })
      await signIn(email, password)
      await api.post('medicos', {
        cpf,
        crm,
        name,
        phone,
        email,
        area,
      })
      showMessage({
        message: 'Sucesso!',
        description: 'Conta criada com sucesso!',
        type: 'success',
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não conseguimos criar sua conta!',
        type: 'danger',
      })
      console.log(error)
    }
  }

  const handleValidateCpf = (value: string) => {
    formik.setFieldValue('cpf', value)
    if (value !== '' && !validate(value)) {
      setError(true)
      return null
    }
    setError(false)
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
      phone: Yup.number(),
      area: Yup.string(),
      password: Yup.string().required(),
    }),
    onSubmit: values => handleOnSubmit(values),
  })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Input
          name="name"
          label="Nome"
          placeholder="Digite seu nome"
          formik={formik}
        />
        <Input
          name="cpf"
          label="CPF"
          placeholder="Digite seu CPF"
          maxLength={11}
          keyboardType="numeric"
          formik={formik}
          onChangeText={value => handleValidateCpf(value)}
          errorMessage={error ? 'CPF inválido!' : ''}
        />
        <Input
          name="crm"
          label="CRM"
          placeholder="Digite seu CRM"
          maxLength={11}
          formik={formik}
        />
        <Input
          name="email"
          label="E-mail"
          placeholder="Digite seu email"
          formik={formik}
        />

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
          style={styles.touchable}
          onPress={() => formik.handleSubmit()}
        >
          <Text style={styles.text}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
