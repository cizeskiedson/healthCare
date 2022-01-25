import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Modal, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import api from '../../services/api'
import { styles } from './styles'

type FormProps = {
  email: string
  password: string
}

export type UserType = 'patient' | 'doctor'

export const SignIn = () => {
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = async (values: FormProps) => {
    const { email, password } = values
    if (password) {
      try {
        const response = await api.post('/users/login', { email, password })
        console.log(response)
        navigation.navigate('Resume')
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('senha n fornecida.')
    }
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

  const navigateToSignUp = (userSelectedType: UserType) => {
    setIsVisible(false)

    setTimeout(() => {
      if (userSelectedType === 'patient') {
        navigation.navigate('SignUp', { userType: userSelectedType })
      } else {
        navigation.navigate('SignUpDoc', { userType: userSelectedType })
      }
    }, 200)
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={isVisible ? 'rgba(0, 0, 0, 0.4)' : '#fff'}
        barStyle="dark-content"
      />
      <View style={styles.signup}>
        <Text>Não possui cadastro ainda?</Text>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Text style={styles.signuptext}>Cadastre-se.</Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: '#F0FFF4',
            borderRadius: 8,
          }}
          onPress={() => formik.handleSubmit()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#38A169',
              alignSelf: 'center',
            }}
          >
            Entrar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isVisible} transparent style={{}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 14,
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: 14,
              borderRadius: 8,
            }}
          >
            <View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                Selecione o tipo de usuário
              </Text>
              <Text style={{ color: '#959595', marginTop: 8 }}>
                Precisamos que selecione um tipo de usuário para efetuar o
                cadastro
              </Text>

              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#D9D9D9',
                  marginVertical: 20,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#F0FFF4',
                  borderRadius: 8,
                }}
                onPress={() => navigateToSignUp('patient')}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#38A169',
                  }}
                >
                  Sou paciente
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: '#EBF8FF',
                  borderRadius: 8,
                }}
                onPress={() => navigateToSignUp('doctor')}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#3182CE',
                  }}
                >
                  Sou médico
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
