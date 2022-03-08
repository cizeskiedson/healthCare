import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../context/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { styles } from './styles'

import api from '../../services/api'
import { showMessage } from 'react-native-flash-message'
import { Input } from '../../components/Input'

type FormProps = {
  name: string
  cpf: string /* x */
  email: string
  phone?: number | null
}

export const CreateContact = () => {
  const { user } = useAuth()
  const navigation = useNavigation()

  const handleOnSubmit = async (values: FormProps) => {
    const { name, cpf, phone, email } = values

    try {
      await api.post('confiancas', {
        name,
        cpf,
        email,
        phone,
        type: 'contact',
      })
      await api.post('pcs', {
        emailPaciente: user?.email,
        emailConfianca: email,
      })
      showMessage({
        message: 'Sucesso!',
        description: 'Contato cadastrado com sucesso!',
        type: 'success',
      })
      navigation.goBack()
    } catch (error) {
      showMessage({
        message: 'Erro!',
        description: 'Não foi possível completar o cadastro!',
        type: 'danger',
      })
    }
  }

  const formik = useFormik<FormProps>({
    initialValues: {
      name: '',
      cpf: '',
      email: '',
      phone: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      email: Yup.string().required(),
      phone: Yup.number(),
    }),
    onSubmit: values => handleOnSubmit(values),
  })
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {' '}
        Seu novo contato receberá um email de alerta em casos de emergência,
        portanto não terá acesso aos seus dados em outras situações.
      </Text>
      <Input
        name="name"
        label="Nome"
        placeholder="Digite o nome"
        formik={formik}
      />
      <Input
        name="cpf"
        label="CPF"
        placeholder="Digite o cpf"
        formik={formik}
        maxLength={11}
        keyboardType="numeric"
      />
      <Input
        name="email"
        label="E-mail"
        placeholder="Digite o email"
        formik={formik}
      />

      <Input
        name="phone"
        label="Telefone"
        placeholder="Digite o telefone"
        formik={formik}
        maxLength={11}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.text}>Salvar contato</Text>
      </TouchableOpacity>
    </View>
  )
}
