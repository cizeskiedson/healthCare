import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ActivityIndicator, RadioButton } from 'react-native-paper'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker'
import { styles } from './styles'
import { colors } from '../../styles/colors'
import api from '../../services/api'
import { useIsFocused, useRoute, RouteProp } from '@react-navigation/native'

type ParamList = {
  History: {
    email: string
  }
}

export const History = () => {
  const route = useRoute<RouteProp<ParamList, 'History'>>()
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [valueList, setValueList] = useState<ValueType | null>(null)

  const [fall, setFall] = useState<undefined | string>(
    'Dados das quedas aqui...'
  )
  const [steps, setSteps] = useState<undefined | string>(
    'Dados das atividades aqui..'
  )
  const [distance, setDistance] = useState<undefined | string>(
    'Dados das atividades aqui..'
  )
  const [items, setItems] = useState([
    { label: 'Último dia', value: 'day' },
    { label: 'Último mês', value: 'month' },
    { label: 'Último ano', value: 'year' },
  ])

  const getData = async (email: string) => {
    console.log('VALUE LIST', valueList)

    try {
      if (valueList && valueList === 'day') {
        const response = await requestDataDay(email)

        setFall(response.fall)
        setSteps(response.steps)

        setDistance(JSON.stringify(0.82 * Number(response.steps)))
        setLoading(false)

        return
      }

      if (valueList && valueList === 'month') {
        const response = await requestDataMonth(email)
        console.log('response month', response)

        setFall(response.fallLastMonth)
        setSteps(response.stepsLastMonth)

        setDistance(JSON.stringify(0.82 * Number(response.stepsLastMonth)))
        setLoading(false)

        return
      }

      const response = await requestDataYear(email)

      setFall(response.fallLastYear)
      setSteps(response.stepsLastYear)

      setDistance(JSON.stringify(0.82 * Number(response.stepsLastYear)))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const requestDataDay = async (email: string) => {
    try {
      console.log('HERE IN DATA DAY')
      const response = await api.get(`pacientes/${email}/data-last-day`)
      console.log('RESPONSE request', response.data)
      return response.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const requestDataMonth = async (email: string) => {
    try {
      const response = await api.get(`pacientes/${email}/data-month`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const requestDataYear = async (email: string) => {
    try {
      const response = await api.get(`pacientes/${email}/data-year`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData(email)
  }, [valueList])

  useEffect(() => {
    if (isFocused) {
      console.log('HISTORY')
      console.log('PARAMS HISTORY', route.params.email)
      setEmail(route.params.email)
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Text style={styles.headerOptions}>Filtro</Text>
      </View>
      <View style={styles.options}>
        <DropDownPicker
          placeholder="Selecione uma opção"
          open={open}
          value={valueList}
          items={items}
          setOpen={setOpen}
          setValue={setValueList}
          setItems={setItems}
          containerStyle={{ width: 190, paddingTop: 5 }}
        />
      </View>
      <View style={styles.divider} />
      {valueList === null && (
        <Text style={styles.selectFilter}>
          Selecione um filtro antes de continuar.
        </Text>
      )}
      {valueList !== null && loading && (
        <ActivityIndicator size="large" color="#000" />
      )}
      {valueList !== null && !loading && (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <Text style={styles.header}>Batimentos Cardíacos</Text>
            <View style={styles.box}>
              <Text style={styles.dataTitle}>Média BPM: </Text>
              <Text style={styles.input}>
                Dados do batimento cardíaco aqui...
              </Text>
              <Text style={styles.dataTitle}>Menor BPM: </Text>
              <Text style={styles.input}>
                Dados do batimento cardíaco aqui...
              </Text>
            </View>
            <Text style={styles.header}>Nível de Oxigênio no Sangue </Text>
            <View style={styles.box}>
              <Text style={styles.dataTitle}>Média O2: </Text>
              <Text style={styles.input}>Dados do oxigênio no sangue...</Text>
              <Text style={styles.dataTitle}>Menor O2: </Text>
              <Text style={styles.input}>Dados do oxigênio no sangue...</Text>
            </View>
            <Text style={styles.header}>Atividade</Text>
            <View style={styles.box}>
              <Text style={styles.dataTitle}>Passos: </Text>
              <Text style={styles.input}>{steps}</Text>
              <Text style={styles.dataTitle}>Distância (m): </Text>
              <Text style={styles.input}>{distance}</Text>
            </View>
            <Text style={styles.header}>Quedas</Text>
            <View style={styles.box}>
              <Text style={styles.dataTitle}>Quantidade: </Text>
              <Text style={styles.input}>{fall}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
