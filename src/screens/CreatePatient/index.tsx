import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import StepIndicator from 'react-native-step-indicator'

import { useAuth } from '../../context/auth'
import { showMessage } from 'react-native-flash-message'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles, stepStyles } from './styles'
import { FormStep } from './components/FormStep'

import api from '../../services/api'

type FormProps = {
  name: string
  cpf: string /* x */
  email: string
  age?: number | null
  phone?: number | null
  password: string
  addressObject: {
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
  nameC: string
  cpfC: string /* x */
  emailC: string
  phoneC?: number | null
}

export const CreatePatient = () => {
  const [stepPosition, setStepPosition] = useState(0)
  const navigation = useNavigation()
  const { user } = useAuth()
  const handleEmail = async (email: string) => {
    try {
      console.log(email)
      api.post('message', {
        email: email,
        subject: 'Confirme seu cadastro.',
        html: `<h1>Confirmação de cadastro</h1> <p> Um novo usuário do MannaHealth te cadastrou como um contato de confiança. </p> <p> Para finalizar seu cadastro basta baixar o app MannaHealth e acessar com os dados de login abaixo, definindo sua senha definitiva: </p> <strong> Login: </strong> <p> ${email} </p> <strong> Senha: </strong> <p> 123senha </p>`,
      })
    } catch (error) {}
  }

  const requestNewUser = async (
    email: string,
    password: string,
    realm: string
  ) => {
    try {
      await api.post('signup', {
        email,
        password,
        realm,
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não conseguimos concluir o cadastro do usuário!',
        type: 'danger',
      })
    }
  }

  const requestNewPatient = async (
    name: string,
    email: string,
    cpf: string,
    address: string,
    age: number | null | undefined,
    phone: number | null | undefined,
    bloodType: string | null | undefined,
    healthProblems: string | null | undefined,
    height: number | null | undefined,
    weight: number | null | undefined,
    observations: string | null | undefined,
    allergies: string | null | undefined
  ) => {
    try {
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
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não conseguimos concluir o cadastro do novo paciente!',
        type: 'danger',
      })
    }
  }

  const requestNewConfianca = async (
    name: string,
    cpf: string,
    email: string,
    phone: number | null | undefined
  ) => {
    try {
      await api.post('confiancas', {
        name,
        cpf,
        email,
        phone,
      })
      await handleEmail(email)
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description:
          'Não conseguimos concluir o cadastro do contato de confiança!',
        type: 'danger',
      })
    }
  }

  const requestNewMpRelation = async (
    emailMedico: string,
    emailPaciente: string
  ) => {
    try {
      await api.post('mps', {
        emailMedico,
        emailPaciente,
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description:
          'Não conseguimos concluir a relação entre o paciente e o médico!',
        type: 'danger',
      })
    }
  }

  const requestNewPcRelation = async (
    emailPaciente: string,
    emailConfianca: string
  ) => {
    try {
      await api.post('pcs', {
        emailPaciente,
        emailConfianca,
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description:
          'Não conseguimos concluir a relação entre o paciente e o contato!',
        type: 'danger',
      })
    }
  }

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
      console.log('hello')
      await requestNewUser(email, password, realm)
      await requestNewUser(emailC, '123senha', 'temp')
      await requestNewPatient(
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
        allergies
      )
      await requestNewConfianca(nameC, cpfC, emailC, phoneC)
      await requestNewMpRelation(user?.email as string, email)
      await requestNewPcRelation(email, emailC)
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
    } finally {
      navigation.goBack()
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
          title={'Voltar'}
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
          style={styles.touchable}
          onPress={() => {
            if (stepPosition === 3) {
              console.log(formik.values)
              formik.handleSubmit()
            } else {
              setStepPosition(oldValue => oldValue + 1)
            }
          }}
        >
          <Text style={styles.textButton}>
            {stepPosition === 3 ? 'Salvar' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
