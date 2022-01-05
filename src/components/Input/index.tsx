import React from 'react'
import {
  Input as RNInput,
  InputProps as RNInputProps,
} from 'react-native-elements'
import { FormikProps } from 'formik'
import { styles } from './styles'

type InputProps = RNInputProps & {
  name: string
  formik?: FormikProps<any>
}

export const Input = ({ name, formik, ...rest }: InputProps) => {
  const errorMessage =
    formik?.touched[name] && formik?.errors[name] ? formik?.errors[name] : null
  return (
    <RNInput
      inputContainerStyle={styles.input}
      containerStyle={styles.container}
      value={formik?.values[name]}
      onChangeText={value => formik?.setFieldValue(name, value)}
      errorMessage={errorMessage as string}
      style={styles.text}
      {...rest}
    />
  )
}
