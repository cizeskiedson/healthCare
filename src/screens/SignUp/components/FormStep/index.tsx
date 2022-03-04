import React, { useState } from 'react'
import { Text, ScrollView, TouchableOpacity } from 'react-native'

import { FormikProps } from 'formik'

import { Input } from '../../../../components/Input'

import { styles } from './styles'

import { validate } from 'gerador-validador-cpf'

type FormStepProps = {
  stepPosition: number
  formik: FormikProps<any>
}

export const FormStep = ({ stepPosition, formik }: FormStepProps) => {
  const [error, setError] = useState(false)
  const [cpf, setCPF] = useState('')

  const handleValidateCpf = (value: string) => {
    setCPF(value)
    console.log('CPF', cpf)
    if (value !== '' && !validate(value)) {
      setError(true)
      return null
    }
    setError(false)
  }

  return (
    <ScrollView style={styles.form}>
      {stepPosition === 0 && (
        <>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            formik={formik}
          />
          <Input
            name="cpf"
            label="CPF"
            placeholder="Digite seu cpf"
            value={cpf}
            formik={formik}
            maxLength={11}
            keyboardType="numeric"
            onChangeText={value => handleValidateCpf(value)}
            errorMessage={error ? 'CPF inválido!' : ''}
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            formik={formik}
          />

          <Input
            name="age"
            label="Idade"
            placeholder="Digite sua idade"
            formik={formik}
            keyboardType="numeric"
          />

          <Input
            name="phone"
            label="Telefone"
            placeholder="Digite seu telefone"
            formik={formik}
            maxLength={11}
            keyboardType="numeric"
          />
          <Input
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            formik={formik}
            secureTextEntry
          />
        </>
      )}
      {stepPosition === 1 && (
        <>
          <Input
            name="addressObject.street"
            label="Endereço"
            placeholder="Digite seu endereço"
            formik={formik}
          />
          <Input
            name="addressObject.number"
            label="Número"
            placeholder="Digite o número"
            formik={formik}
            keyboardType="numeric"
            maxLength={5}
          />
          <Input
            name="addressObject.neighborhood"
            label="Bairro"
            placeholder="Digite seu bairro"
            formik={formik}
          />
          <Input
            name="addressObject.zipCode"
            label="CEP"
            placeholder="Digite seu CEP"
            formik={formik}
            keyboardType="numeric"
            maxLength={8}
          />
        </>
      )}
      {stepPosition === 2 && (
        <>
          <Input
            name="bloodType"
            label="Tipo Sanguíneo"
            placeholder="Digite seu tipo sanguíneo"
            formik={formik}
            maxLength={3}
          />
          <Input
            multiline
            numberOfLines={4}
            name="healthProblems"
            label="Problemas de Saúde"
            placeholder="Informe seus problemas de saúde"
            formik={formik}
          />
          <Input
            name="height"
            label="Altura"
            placeholder="Digite sua altura"
            formik={formik}
            keyboardType="numeric"
          />
          <Input
            name="weight"
            label="Peso"
            placeholder="Digite seu peso"
            formik={formik}
            keyboardType="numeric"
          />
          <Input
            multiline
            numberOfLines={4}
            name="allergies"
            label="Alergias"
            placeholder="Informe suas alergias"
            formik={formik}
          />
          <Input
            multiline
            numberOfLines={4}
            name="observations"
            label="Observações"
            placeholder="Algo mais?"
            formik={formik}
          />
        </>
      )}
      {stepPosition === 3 && (
        <>
          <Text style={styles.header}>
            {' '}
            Antes de concluir o cadastro, é necessário associar um contato de
            confiança para a sua conta.
          </Text>
          <Input
            name="nameC"
            label="Nome"
            placeholder="Digite o nome"
            formik={formik}
          />
          <Input
            name="cpfC"
            label="CPF"
            placeholder="Digite o cpf"
            formik={formik}
            maxLength={11}
            keyboardType="numeric"
          />
          <Input
            name="emailC"
            label="E-mail"
            placeholder="Digite o email"
            formik={formik}
          />

          <Input
            name="phoneC"
            label="Telefone"
            placeholder="Digite o telefone"
            formik={formik}
            maxLength={11}
            keyboardType="numeric"
          />
        </>
      )}
    </ScrollView>
  )
}
