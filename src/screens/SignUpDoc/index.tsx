import React from 'react'
import { Button } from 'react-native-elements'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { styles } from './styles'

import api from '../../services/api'

type FormProps = {
  name: string
  cpfString: string
  crm: string
  email: string
  phoneString: string
  area: string
  password: string
}

export const SignUpDoc = () => {
  const navigation = useNavigation()

  const { signIn } = useAuth()

  const handleOnSubmit = async (values: FormProps) => {
    console.log('teste')
    const { name, cpfString, crm, email, phoneString, area, password } = values
    const cpf = Number(cpfString)
    const phone = Number(phoneString)
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
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik<FormProps>({
    initialValues: {
      name: '',
      cpfString: '',
      crm: '',
      email: '',
      phoneString: '',
      area: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      cpfString: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      crm: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CRM inválido.')
        .required('CRM é um campo obrigatório.'),
      email: Yup.string().required(),
      phoneString: Yup.number(),
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
          name="cpfString"
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
          formik={formik}
        />
        <Input
          name="email"
          label="E-mail"
          placeholder="Digite seu email"
          formik={formik}
        />

        <Input
          name="phoneString"
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
          style={{
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: '#1dd3f8',
            borderRadius: 8,
          }}
          onPress={() => formik.handleSubmit()}
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
