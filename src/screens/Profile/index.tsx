import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import { Input } from '../../components/Input'
import { Modal } from '../../components/Modal'
import api from '../../services/api'
import { styles } from './styles'
import { useAuth } from '../../context/auth'

import { useIsFocused, useRoute, RouteProp } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { showMessage } from 'react-native-flash-message'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ParamsProfile, Patient } from '../../types'

export const Profile = () => {
  const route = useRoute<RouteProp<ParamsProfile, 'Profile'>>()

  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const { signOut } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const isFocused = useIsFocused()

  const handleOnFillForms = async (email: string) => {
    setLoading(true)
    try {
      console.log('EMAIL', email)
      const { data } = await api.get(`pacientes/${email}`)
      console.log('RESPONSE FILL FORMS', data)

      formik.setValues(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOnSubmit = async (values: Patient, email: string) => {
    try {
      if (values) {
        const {
          name,
          phone,
          age,
          address,
          bloodType,
          healthProblems,
          height,
          weight,
          allergies,
          observations,
        } = values

        await api.patch(`/pacientes/${email}`, {
          name: name,
          phone: phone,
          age: age,
          address: address,
          bloodType: bloodType,
          healthProblems: healthProblems,
          height: height,
          weight: weight,
          allergies: allergies,
          observations: observations,
        })
        showMessage({
          message: 'Sucesso!',
          description: 'Novas informações salvas com sucesso!',
          type: 'success',
        })
        setEdit(false)
        handleOnFillForms(email)
      }
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível editar seus dados',
        type: 'danger',
      })
    }
  }
  useEffect(() => {
    if (isFocused) {
      console.log('here')
      console.log('PARAMS PROFILE', route.params.email)
      handleOnFillForms(route.params.email)
    }
  }, [isFocused])
  /* 
  useEffect(() => {
    if (!edit) {
      handleOnFillForms(route.params.email)
    }
  }, [edit]) */

  const formik = useFormik<Patient>({
    initialValues: {
      name: '',
      email: '',
      cpf: '',
      address: '',
      age: '',
      phone: '',
      bloodType: '',
      healthProblems: '',
      height: '',
      weight: '',
      observations: '',
      allergies: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'CPF inválido.')
        .required('CPF é um campo obrigatório.'),
      email: Yup.string().required(),
      address: Yup.string().required(),
      age: Yup.string(),
      phone: Yup.string(),
      bloodType: Yup.string(),
      healthProblems: Yup.string(),
      height: Yup.string(),
      weight: Yup.string(),
      observations: Yup.string(),
      allergies: Yup.string(),
    }),
    onSubmit: values => handleOnSubmit(values, route.params.email),
  })

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />
  }

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 80,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => {
            edit ? setEdit(false) : setEdit(true)
          }}
        >
          <Feather
            name="edit"
            style={{
              fontSize: 16,
              color: '#000',
              letterSpacing: 0.1,
            }}
          >
            {edit ? 'Cancelar' : 'Editar'}
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!edit}
          style={{
            backgroundColor: '#fff',
            width: 80,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => {
            formik.handleSubmit()
          }}
        >
          <Feather
            name="save"
            style={{
              fontSize: 16,
              color: '#000',
              letterSpacing: 0.1,
            }}
          >
            Salvar
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => setIsVisible(true)}
        >
          <Feather
            name="log-out"
            style={{
              fontSize: 16,
              color: '#D9534F',
              alignSelf: 'center',
              letterSpacing: 0.1,
            }}
          ></Feather>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }}>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            editable={edit}
            formik={formik}
          />
          <Input
            name="cpf"
            label="CPF"
            placeholder="Digite seu cpf"
            maxLength={11}
            keyboardType="numeric"
            editable={false}
            formik={formik}
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            editable={false}
            formik={formik}
          />

          <Input
            name="age"
            label="Idade"
            placeholder="Digite sua idade"
            keyboardType="numeric"
            editable={edit}
            formik={formik}
          />

          <Input
            name="phone"
            label="Telefone"
            placeholder="Digite seu telefone"
            maxLength={11}
            keyboardType="numeric"
            editable={edit}
            formik={formik}
          />
          <Input
            name="address"
            label="Endereço"
            placeholder="Digite seu endereço"
            editable={edit}
            formik={formik}
          />
          <Input
            name="bloodType"
            label="Tipo Sanguíneo"
            placeholder="Digite seu tipo sanguíneo"
            maxLength={3}
            editable={edit}
            formik={formik}
          />
          <Input
            multiline
            numberOfLines={4}
            name="healthProblems"
            label="Problemas de Saúde"
            placeholder="Informe seus problemas de saúde"
            editable={edit}
            formik={formik}
          />
          <Input
            name="height"
            label="Altura"
            placeholder="Digite sua altura"
            keyboardType="numeric"
            editable={edit}
            formik={formik}
          />
          <Input
            name="weight"
            label="Peso"
            placeholder="Digite seu peso"
            keyboardType="numeric"
            editable={edit}
            formik={formik}
          />
          <Input
            multiline
            numberOfLines={4}
            name="allergies"
            label="Alergias"
            placeholder="Informe suas alergias"
            editable={edit}
            formik={formik}
          />
          <Input
            multiline
            numberOfLines={4}
            name="observations"
            label="Observações"
            placeholder="Algo mais?"
            editable={edit}
            formik={formik}
          />
        </ScrollView>
        <Modal
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          title="Tem certeza que deseja sair?"
          description="Caso queira, você retornará a tela inicial do aplicativo."
          options={[
            {
              name: 'Sair',
              onPress: () => signOut(),
            },
          ]}
        />
      </View>
    </View>
  )
}
