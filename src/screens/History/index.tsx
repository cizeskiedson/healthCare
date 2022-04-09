import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ActivityIndicator, RadioButton } from 'react-native-paper'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker'
import { styles } from './styles'
import { LineChart } from 'react-native-chart-kit'
import { colors } from '../../styles/colors'
import api from '../../services/api'
import { useIsFocused, useRoute, RouteProp } from '@react-navigation/native'
import { DataLastDay, DataMonth, DataYear } from '../../utils/bluetooth'

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
  const [valueFilter, setValueFilter] = useState('first')
  const [chartParentWidth, setChartParentWidth] = useState(0)
  const [open, setOpen] = useState(false)
  const [valueList, setValueList] = useState<ValueType | null>(null)
  const [dataDay, setDataDay] = useState<DataLastDay>()
  const [dataMonth, setDataMonth] = useState<DataMonth>()
  const [dataYear, setDataYear] = useState<DataYear>()
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
    switch (valueList) {
      case 'day':
        console.log('DAY FILTER')
        try {
          const response = await requestDataDay(email)
          setDataDay(response.data)
          console.log('RESPONSE', response.data)
          setFall(dataDay?.fall)
          setSteps(dataDay?.steps)
          calculateDistance()
          setLoading(false)
          console.log('DATA DAY INTERNAL', dataDay)
          console.log('DATA DAY', dataDay)
        } catch (error) {
          console.log(error)
        }
        break
      case 'month':
        try {
          console.log('MONTH FILTER')
          await requestDataMonth(email)
          console.log('DATA MONTH', dataMonth)
        } catch (error) {
          console.log(error)
        }
        break
      case 'year':
        try {
          console.log('YEAR FILTER')
          await requestDataYear(email)
          console.log('DATA YEAR', dataYear)
        } catch (error) {
          console.log(error)
        }
        break
      default:
        break
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
      setDataMonth(response.data)
      setFall(dataMonth?.fallLastMonth)
      setSteps(dataMonth?.stepsLastMonth)
      calculateDistance()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const requestDataYear = async (email: string) => {
    try {
      const response = await api.get(`pacientes/${email}/data-year`)
      setDataYear(response.data)
      setFall(dataYear?.fallLastYear)
      setSteps(dataYear?.stepsLastYear)
      calculateDistance()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const calculateDistance = async () => {
    const dist = 0.82 * Number(steps)
    setDistance(JSON.stringify(dist))
  }

  const renderItem = (fall: string | undefined, steps: string | undefined) => {
    return (
      <Text>
        Teste {fall} e {steps}
      </Text>
    )
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

  /* useEffect(() => {

  }, [fall]) */

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Text style={styles.headerOptions}>Filtro</Text>
        <Text style={styles.headerOptions}>Modo de visão</Text>
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
          containerStyle={{ width: 190 }}
        />
        <RadioButton.Group
          onValueChange={newValue => setValueFilter(newValue)}
          value={valueFilter}
        >
          <View style={styles.radialOption}>
            <RadioButton value="first" />
            <Text style={styles.textOption}>Gráfico</Text>
          </View>
          <View style={styles.radialOption}>
            <RadioButton value="second" />
            <Text style={styles.textOption}>Tabela</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.divider} />
      {console.log('VALOR DA LISTA', valueList)}
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
          {valueFilter === 'first' && (
            <View style={{ flex: 1 }}>
              <View
                style={{ flex: 1 }}
                onLayout={({ nativeEvent }) =>
                  setChartParentWidth(nativeEvent.layout.width)
                }
              >
                <Text style={styles.header}>Batimentos Cardíacos</Text>
                <LineChart
                  data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
                  }}
                  width={chartParentWidth} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: colors.darkGreen,
                    backgroundGradientFrom: colors.lightGreen,
                    backgroundGradientTo: colors.darkGreen,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: colors.darkGray,
                    },
                    propsForLabels: {
                      fontWeight: 'bold',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    flex: 1,
                  }}
                />
              </View>
              <View
                onLayout={({ nativeEvent }) =>
                  setChartParentWidth(nativeEvent.layout.width)
                }
              >
                <Text style={styles.header}>Nível de Oxigênio no sangue</Text>
                <LineChart
                  data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
                  }}
                  width={chartParentWidth} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: colors.lightGreen,
                    backgroundGradientFrom: colors.darkGreen,
                    backgroundGradientTo: colors.lightGreen,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: colors.darkGray,
                    },
                    propsForLabels: {
                      fontWeight: 'bold',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    backgroundColor: 'black',
                    flex: 1,
                  }}
                />
              </View>
              <View
                onLayout={({ nativeEvent }) =>
                  setChartParentWidth(nativeEvent.layout.width)
                }
              >
                <Text style={styles.header}>Atividade</Text>
                <LineChart
                  data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
                  }}
                  width={chartParentWidth} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: colors.darkGreen,
                    backgroundGradientFrom: colors.lightGreen,
                    backgroundGradientTo: colors.darkGreen,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: colors.darkGray,
                    },
                    propsForLabels: {
                      fontWeight: 'bold',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    backgroundColor: 'black',
                    flex: 1,
                  }}
                />
              </View>
            </View>
          )}
          {
            valueFilter === 'second' && renderItem(fall, steps)

            /* 
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
            </View> */
          }
        </ScrollView>
      )}
    </View>
  )
}
