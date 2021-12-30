import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { styles } from './styles'

type FormProps = {
  email: string
  password: string
}

export const SignIn = () => {
  const handleSubmit = (values: FormProps) => {
    const { email, password } = values
    if (password) {
      console.log('senha fornecida.')
      return
    }
    console.log('senha n fornecida.')
  }

  const formik = useFormik<FormProps>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('E-mail inválido.')
        .required('E-mail é um campo obrigatório.'),
      password: Yup.string(),
    }),
    onSubmit: values => handleSubmit(values),
  })

  return (
    <View style={styles.container}>
      <View>
        <Text>Não possui cadastro ainda? Cadastre-se.</Text>
      </View>
      <View>
        <Input
          name="email"
          label="E-mail"
          placeholder="Digite seu e-mail."
          formik={formik}
        />
        <Input
          name="password"
          label="Senha"
          placeholder="Digite sua senha."
          secureTextEntry
          formik={formik}
        />
        <Button title="Entrar" onPress={() => formik.handleSubmit()} />
      </View>
    </View>
  )
}
