import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { FormikProps } from 'formik'

import DatePicker from 'react-native-neat-date-picker'

import { Input } from '../../../../components/Input'

import { styles } from './styles'

type FormStepProps = {
  stepPosition: number
  formik: FormikProps<any>
}

export const FormStep = ({ stepPosition, formik }: FormStepProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = date => {
    // You should close the modal in here
    setShowDatePicker(false)

    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(date.getDate())
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
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 22,
                backgroundColor: '#F0FFF4',
                borderRadius: 8,
              }}
              onPress={openDatePicker}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#38A169',
                  alignSelf: 'center',
                }}
              >
                Data de Nascimento
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            isVisible={showDatePicker}
            mode={'single'}
            onCancel={onCancel}
            onConfirm={onConfirm}
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
