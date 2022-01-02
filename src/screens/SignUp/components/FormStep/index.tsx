import React from 'react'
import { ScrollView } from 'react-native'

import { FormikProps } from 'formik'

import { Input } from '../../../../components/Input'

import { styles } from './styles'

type FormStepProps = {
  stepPosition: number
  formik: FormikProps<any>
}

export const FormStep = ({ stepPosition, formik }: FormStepProps) => {
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
            formik={formik}
            maxLength={11}
            keyboardType="numeric"
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
            name="birthDate"
            label="Data de Nascimento"
            placeholder="Digite sua data de nascimento"
            formik={formik}
            maxLength={11}
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
            name="street"
            label="Endereço"
            placeholder="Digite seu endereço"
            formik={formik}
          />
          <Input
            name="number"
            label="Número"
            placeholder="Digite o número"
            formik={formik}
            keyboardType="numeric"
          />
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="Digite seu bairro"
            formik={formik}
          />
          <Input
            name="zipCode"
            label="CEP"
            placeholder="Digite seu CEP"
            formik={formik}
            keyboardType="numeric"
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
    </ScrollView>
  )
}
