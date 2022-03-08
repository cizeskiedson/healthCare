import React from 'react'
import { View, Text, Image } from 'react-native'

import { styles } from './styles'
import groupImg from '../../assets/group.png'

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Manna
        <Text style={styles.titleBold}>Health</Text>
      </Text>
      <Image source={groupImg} resizeMode="contain" style={styles.group} />
    </View>
  )
}
