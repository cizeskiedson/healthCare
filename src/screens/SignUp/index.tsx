import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import { useNavigation, useRoute } from '@react-navigation/native'

import StepIndicator from 'react-native-step-indicator'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { UserType } from '../SignIn'
import { styles, stepStyles } from './styles'
import { FormStep } from './components/FormStep'

type FormProps = {
  name: string
  cpf: string
  email: string
  age?: number | null
  phone?: string
  birthDate?: Date | null
  password: string
  address: {
    street: string
    number: number | null
    neighborhood: string
    zipCode: string
  }
  bloodType?: string
  healthProblems?: string
  height?: number | null
  weight?: number | null
  observations?: string
  allergies?: string
}

type RouteParams = {
  userType: UserType
}

export const SignUp = () => {
  const [stepPosition, setStepPosition] = useState(0)

  const navigation = useNavigation()
  const route = useRoute()

  const userType = route.params as RouteParams

  console.log(userType)

  const handleSubmit = (values: FormProps) => {
    const { cpf } = values
    console.log(cpf)
  }

  const formik = useFormik<FormProps>({
    initialValues: {
      name: '',
      email: '',
      cpf: '',
      address: {
        street: '',
        number: null,
        neighborhood: '',
        zipCode: '',
      },
      age: null,
      phone: '',
      birthDate: null,
      bloodType: '',
      healthProblems: '',
      height: null,
      weight: null,
      observations: '',
      allergies: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      email: Yup.string().required(),
      address: Yup.object().shape({
        street: Yup.string().required(),
        number: Yup.number().required(),
        neighborhood: Yup.string().required(),
        zipCode: Yup.string().required(),
      }),
      age: Yup.number(),
      phone: Yup.string(),
      birthDate: Yup.date(),
      bloodType: Yup.string(),
      healthProblems: Yup.string(),
      height: Yup.number(),
      weight: Yup.number(),
      observations: Yup.string(),
      allergies: Yup.string(),
      password: Yup.string().required(),
    }),
    onSubmit: values => handleSubmit(values),
  })

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={stepStyles}
        currentPosition={stepPosition}
        stepCount={4}
        labels={['Dados Pessoais', 'Endereço', 'Saúde', 'Contato de Confiança']}
      />

      <FormStep stepPosition={stepPosition} formik={formik} />

      <View style={styles.options}>
        <Button
          title={stepPosition === 0 ? 'Voltar ao login' : 'Voltar'}
          type="clear"
          onPress={() => {
            if (stepPosition === 0) {
              navigation.goBack()
              return
            }

            setStepPosition(oldValue => oldValue - 1)
          }}
        />

        <Button
          title="Continuar"
          onPress={() => setStepPosition(oldValue => oldValue + 1)}
        />
      </View>
    </View>
  )
}
