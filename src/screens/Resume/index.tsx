import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles'

export const Resume = () => {
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(true)
  const [distance, setDistance] = useState('')
  const [fall, setFall] = useState<undefined | string | null>(
    'Dados das quedas aqui...'
  )
  const [steps, setSteps] = useState<undefined | string | null>(
    'Dados das atividades aqui..'
  )

  const getData = async () => {
    setLoading(true)
    try {
      setSteps(await AsyncStorage.getItem('@healthCare:steps'))
      console.log('STEPS', steps)
      setFall(await AsyncStorage.getItem('@healthCare:fall'))
      console.log('FALLS', fall)
      setDistance(JSON.stringify(0.82 * Number(steps)))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  /*   const setData = async () => {
    try {
      await AsyncStorage.setItem('@healthCare:steps', '20')
      await AsyncStorage.setItem('@healthCare:fall', '1')
    } catch (error) {
      console.log(error)
    }
  } */

  useEffect(() => {
    if (isFocused) {
      /* 
      setData() */
      getData()
    }
  }, [isFocused])

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Batimentos Cardíacos</Text>
        <View style={styles.box}>
          <Text style={styles.input}>Dados do batimento cardíaco aqui...</Text>
        </View>
        <Text style={styles.header}>Nível de Oxigênio no Sangue </Text>
        <View style={styles.box}>
          <Text style={styles.input}>
            Dados do nível de oxigênio no sangue aqui...
          </Text>
        </View>
        <Text style={styles.header}>Atividade</Text>
        <View style={styles.box}>
          <View style={styles.textInBox}>
            <Text style={styles.inputActivity}>{steps}</Text>
            <Text style={styles.activityText}>passos hoje.</Text>
          </View>
          <View style={styles.textInBoxReverse}>
            <Text style={styles.activityText}>metros.</Text>
            <Text style={styles.inputActivity}>{distance}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
