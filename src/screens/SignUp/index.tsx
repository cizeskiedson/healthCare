import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import StepIndicator from 'react-native-step-indicator'

import { useAuth } from '../../context/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { styles, stepStyles } from './styles'
import { FormStep } from './components/FormStep'

import api from '../../services/api'
import { showMessage } from 'react-native-flash-message'

type FormProps = {
  name: string
  cpf: string /* x */
  email: string
  age?: number | null
  phone?: number | null
  password: string
  addressObject: {
    /* x Object -> string */ street: string
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
  nameC: string
  cpfC: string /* x */
  emailC: string
  phoneC?: number | null
}

export const SignUp = () => {
  const [stepPosition, setStepPosition] = useState(0)

  const { signIn } = useAuth()
  const navigation = useNavigation()

  const handleOnSubmit = async (values: FormProps) => {
    console.log('welcome')
    const realm = 'patient'
    const {
      name,
      cpf,
      age,
      phone,
      height,
      weight,
      email,
      password,
      addressObject,
      bloodType,
      healthProblems,
      observations,
      allergies,
      nameC,
      cpfC,
      emailC,
      phoneC,
    } = values
    console.log(values)
    const address =
      addressObject.street +
      ', ' +
      addressObject.number +
      ' - ' +
      addressObject.neighborhood +
      ', CEP: ' +
      addressObject.zipCode

    try {
      await api.post('signup', {
        email,
        password,
        realm,
      })
      const a = await api.post('signup', {
        email: emailC,
        password: '123senha',
        realm: 'temp',
      })
      await signIn(email, password)
      await api.post('pacientes', {
        name,
        email,
        cpf,
        address,
        age,
        phone,
        bloodType,
        healthProblems,
        height,
        weight,
        observations,
        allergies,
      })
      await api.post('confiancas', {
        name: nameC,
        cpf: cpfC,
        email: emailC,
        phone: phoneC,
      })
      await api.post('pcs', {
        emailPaciente: email,
        emailConfianca: emailC,
      })
      console.log(a)
      showMessage({
        message: 'Sucesso!',
        description: 'Conta criada com sucesso!',
        type: 'success',
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não conseguimos terminar seu cadastro!',
        type: 'danger',
      })
      console.log(error)
    }
  }

  const formik = useFormik<FormProps>({
    initialValues: {
      name: '',
      email: '',
      cpf: '',
      addressObject: {
        street: '',
        number: null,
        neighborhood: '',
        zipCode: '',
      },
      age: null,
      phone: null,
      bloodType: '',
      healthProblems: '',
      height: null,
      weight: null,
      observations: '',
      allergies: '',
      password: '',
      nameC: '',
      cpfC: '',
      emailC: '',
      phoneC: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      email: Yup.string().required(),
      addressObject: Yup.object().shape({
        street: Yup.string().required(),
        number: Yup.number().required(),
        neighborhood: Yup.string().required(),
        zipCode: Yup.string().required(),
      }),
      age: Yup.number(),
      phone: Yup.number(),
      bloodType: Yup.string(),
      healthProblems: Yup.string(),
      height: Yup.number(),
      weight: Yup.number(),
      observations: Yup.string(),
      allergies: Yup.string(),
      password: Yup.string().required(),
      nameC: Yup.string().required(),
      cpfC: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      emailC: Yup.string().required(),
      phoneC: Yup.number(),
    }),
    onSubmit: values => handleOnSubmit(values),
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
          titleStyle={{ color: '#00042c' }}
          onPress={() => {
            if (stepPosition === 0) {
              navigation.goBack()
              return
            }

            setStepPosition(oldValue => oldValue - 1)
          }}
        />

        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: '#1dd3f8',
            borderRadius: 8,
          }}
          onPress={() => {
            if (stepPosition === 3) {
              /* console.log(formik.values) */
              formik.handleSubmit()
            } else {
              setStepPosition(oldValue => oldValue + 1)
            }
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
            {stepPosition === 3 ? 'Salvar' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
