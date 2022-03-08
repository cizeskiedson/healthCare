import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  Modal as RNModal,
  ModalProps as RNModalProps,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import { colors } from '../../styles/colors'
import { styles } from './styles'

type Options = {
  name: string
  onPress: () => void
}

type ModalProps = RNModalProps & {
  title: string
  description: string
  options: Options[]
}

export const Modal = ({ title, description, options, ...rest }: ModalProps) => {
  return (
    <RNModal transparent {...rest}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Feather name="x" size={22} onPress={rest.onRequestClose} />
            </View>

            <Text style={styles.description}>{description}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.buttons}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={String(index)}
                style={
                  index === 1
                    ? styles.button
                    : { ...styles.button, backgroundColor: colors.gray }
                }
                onPress={option.onPress}
              >
                <Text style={styles.buttonText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </RNModal>
  )
}
