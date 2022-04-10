import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showMessage } from 'react-native-flash-message'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../context/auth'

import { Input } from '../../components/Input'
import { Logo } from '../../components/Logo'
import { Modal } from '../../components/Modal'

import { colors } from '../../styles/colors'
import { styles } from './styles'
import illustrationImg from '../../assets/health-illustration.png'

import { SignInProps, UserType } from '../../types'

export const SignIn = () => {
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleOnSignIn = async (values: SignInProps) => {
    setIsLoading(true)
    const { email, password } = values

    try {
      await signIn(email, password)
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'E-mail ou senha incorretos.',
        type: 'danger',
      })

      setIsLoading(false)
    }
  }

  const formik = useFormik<SignInProps>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('E-mail inválido.')
        .required('E-mail é um campo obrigatório.'),
      password: Yup.string().required('Senha é um campo obrigatório'),
    }),
    onSubmit: values => handleOnSignIn(values),
  })

  const navigateToSignUp = (userSelectedType: UserType) => {
    setIsVisible(false)

    setTimeout(() => {
      if (userSelectedType === 'patient') {
        navigation.navigate('SignUp', { userType: userSelectedType })
      } else if (userSelectedType === 'doctor') {
        navigation.navigate('SignUpDoc', { userType: userSelectedType })
      }
    }, 200)
  }

  return (
    <>
      <StatusBar
        backgroundColor={isVisible ? 'rgba(0, 0, 0, 0.4)' : '#fff'}
        barStyle="dark-content"
      />

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <Logo />
          <Image
            source={illustrationImg}
            resizeMode="contain"
            style={styles.illustration}
          />
        </View>

        <View>
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
              style={
                formik.isValid
                  ? styles.button
                  : { ...styles.button, opacity: 0.7 }
              }
              onPress={() => formik.handleSubmit()}
              disabled={!formik.isValid}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signup}>
              <Text>Não possui cadastro ainda?</Text>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Text style={styles.signuptext}>Cadastre-se.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            title="Selecione o tipo de usuário"
            description="Precisamos que selecione um tipo de usuário para efetuar o
              cadastro"
            options={[
              {
                name: 'Sou paciente',
                onPress: () => navigateToSignUp('patient'),
              },
              {
                name: 'Sou doutor',
                onPress: () => navigateToSignUp('doctor'),
              },
            ]}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}
