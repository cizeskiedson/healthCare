import React from 'react'

import { Text, View } from 'react-native'

import { Searchbar } from 'react-native-paper'
import { styles } from './styles'

export const Search = () => {
  return (
    <View style={styles.container}>
      <Searchbar placeholder="Buscar paciente..." />
    </View>
  )
}
