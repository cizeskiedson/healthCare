import { PermissionsAndroid, Platform } from 'react-native'
import { BleManager, Device } from 'react-native-ble-plx'
import { Buffer } from 'buffer'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
/* import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager' */
import api from '../../services/api'
import { useAuth } from '../../context/auth'
import { Contact, getContactsByPatient, Patient } from '../../services/patient'
import { alertMessage } from '../../utils/emergency'
import { showMessage } from 'react-native-flash-message'

import mongodb from 'mongodb'

/* const BACKGROUND_FETCH_TASK = 'background-fetch'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, () => {
  const now = Date.now()

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  )

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData
  /* console.warn('FETCH BACKGROUND')
  try {
    const { user } = useAuth()
    const getSteps = await AsyncStorage.getItem('@healthCare:steps')
    console.log('GET STEPS', getSteps)
    const getFalls = await AsyncStorage.getItem('@healthCare:falls')
    console.log('GET FALLS', getFalls)
    const delResponse = await api.delete(
      `/pacientes/${user?.email}/data-last-day`
    )
    console.log('DELETE', delResponse)
    const response = await api.post('/data-last-day', {
      steps: getSteps,
      falls: getFalls,
      emailPaciente: user?.email as string,
    })
    console.log('RESPONSE', response)
    console.log('ALL FETCH DATA DONE')
    return response.data
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData
  } catch (error) {
    console.log('ERROR', error)
    return BackgroundFetch.BackgroundFetchResult.Failed
  } 
})

async function registerBackgroundFetchAsync() {
  console.log('REGISTER BACKGROUND FETCH')
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 16, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  })
}
 async function sendDataToServer() {
  console.warn('FETCH BACKGROUND')
  try {
    const { user } = useAuth()
    const getSteps = await AsyncStorage.getItem('@healthCare:steps')
    const getFalls = await AsyncStorage.getItem('@healthCare:falls')
    await api.delete(`/pacientes/${user?.email}/data-last-day`)
    const response = await api.post('/data-last-day', {
      steps: getSteps,
      falls: getFalls,
      emailPaciente: user?.email as string,
    })
    console.log('ALL FETCH DATA DONE')
    return response
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData
  } catch (error) {
    console.log('ERROR', error)
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
}

async function initBackgroundFetch(taskName: string, interval = 60 * 1) {
  try {
    console.log('INIT BACKGROUND FETCH')
    if (!TaskManager.isTaskDefined(taskName)) {
      console.log('TASK DEFINED')
      TaskManager.defineTask(taskName, sendDataToServer)
    }
    console.log('REGISTER BACKGROUND FUNCTION')
    await BackgroundFetch.registerTaskAsync(taskName, {
      minimumInterval: interval,
    })
    await BackgroundFetch.setMinimumIntervalAsync(interval)
  } catch (err) {
    console.log('registerTaskAsync() failed:', err)
  }
}

initBackgroundFetch('dataToServer') 

registerBackgroundFetchAsync() */
export type DataLastDay = {
  id: string
  steps: string
  fall: string
  emailPaciente: string
}

export type DataMonth = {
  id: string
  stepsCurrentMonth: string
  fallCurrentMonth: string
  stepsLastMonth: string
  fallLastMonth: string
  emailPaciente: string
}

export type DataYear = {
  id: string
  stepsCurrentYear: string
  fallCurrentYear: string
  stepsLastYear: string
  fallLastYear: string
  emailPaciente: string
}

const updateLocalSteps = async (steps: string) => {
  try {
    console.log('STEPS', steps)
    await AsyncStorage.setItem('@healthCare:steps', steps)
  } catch (error) {
    console.log(error)
  }
}

const updateLocalFalls = async (falls: string) => {
  try {
    console.log('FALLS', falls)
    await AsyncStorage.setItem('@healthCare:falls', falls)
  } catch (error) {
    console.log(error)
  }
}
const manager = new BleManager()

export const BluetoothModule = async () => {
  const [device, setDevice] = useState<Device | null>(null)
  const [permission, setPermission] = useState(false)
  const [emergency, setEmergency] = useState(false)
  const [contacts, setContacts] = useState<Contact[] | []>([])
  const [data, setData] = useState<Patient>()

  const [oldData, setOldData] = useState<DataLastDay | null>(null)
  const [oldDataMonth, setOldDataMonth] = useState<DataMonth | null>(null)
  const [oldDataYear, setOldDataYear] = useState<DataYear | null>(null)
  const [date, setDate] = useState<Date>()
  const [month, setMonth] = useState<Date>()
  const [year, setYear] = useState<Date>()
  const [flagNewData, setFlagNewData] = useState(false)
  const [flagNewMonth, setFlagNewMonth] = useState(false)
  const [flagNewYear, setFlagNewYear] = useState(false)

  const { user } = useAuth()

  /* useEffect(() => {
    requestScanPermission()
  }) */

  useEffect(() => {
    console.log('Called function to see if newData will be storaged')
    getDataLastDay()
    getDataMonth()
    getDataYear()
  }, [])

  useEffect(() => {
    console.log('Object id', oldData?.id)
    const timestamp = oldData?.id.toString().substring(0, 8) as string
    const date = new Date(parseInt(timestamp, 16) * 1000)
    console.log(date)
    setDate(date)
  }, [oldData])

  useEffect(() => {
    console.log('Object id', oldDataMonth?.id)
    const timestamp = oldDataMonth?.id.toString().substring(0, 8) as string
    const date = new Date(parseInt(timestamp, 16) * 1000)
    console.log(date)
    setMonth(date)
  }, [oldDataMonth])

  useEffect(() => {
    console.log('Object id', oldDataYear?.id)
    const timestamp = oldDataYear?.id.toString().substring(0, 8) as string
    const date = new Date(parseInt(timestamp, 16) * 1000)
    console.log(date)
    setYear(date)
  }, [oldDataYear])

  useEffect(() => {
    console.log('DATE HERE')
    const now = new Date().getTime()
    console.log('NOW', now)
    const msDiff = now - (date?.getTime() as number)
    const minutes = Math.floor(msDiff / (1000 * 60))

    if (minutes > 30) setFlagNewData(true)
    else setFlagNewData(false)
  }, [date])

  useEffect(() => {
    console.log('DATE HERE')
    const now = new Date().getTime()
    console.log('NOW', now)
    const msDiff = now - (month?.getTime() as number)
    const hours = Math.floor(msDiff / (1000 * 60 * 60))

    if (hours > 24) setFlagNewMonth(true)
    else setFlagNewMonth(false)
  }, [month])

  useEffect(() => {
    console.log('DATE HERE')
    const now = new Date().getTime()
    console.log('NOW', now)
    const msDiff = now - (year?.getTime() as number)
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24))

    if (days >= 30) setFlagNewYear(true)
    else setFlagNewYear(false)
  }, [year])

  useEffect(() => {
    if (flagNewData) sendNewData()
    if (flagNewMonth) sendNewMonth()
    if (flagNewYear) sendNewYear()
  }, [flagNewData, flagNewMonth, flagNewYear])

  useEffect(() => {
    if (emergency) {
      console.log('email', user?.email)
      sendEmail(user?.email as string)
    }
    setEmergency(false)
  }, [emergency])

  const getDataLastDay = async () => {
    // do stuff
    console.log('GET DATA DAY STARTED')
    const responseGet = await api.get(`pacientes/${user?.email}/data-last-day`)
    console.log('DATA', responseGet.data)
    setOldData(responseGet.data)
  }

  const getDataMonth = async () => {
    // do stuff
    console.log('GET DATA MONTH STARTED')
    const responseGet = await api.get(`pacientes/${user?.email}/data-month`)
    console.log('MONTH', responseGet.data)
    setOldDataMonth(responseGet.data)
  }

  const getDataYear = async () => {
    // do stuff
    console.log('GET DATA YEAR STARTED')
    const responseGet = await api.get(`pacientes/${user?.email}/data-year`)
    console.log('YEAR', responseGet.data)
    setOldDataYear(responseGet.data)
  }

  const sendNewData = async () => {
    console.log('sending new data')
    try {
      const steps = await AsyncStorage.getItem('@healthCare:steps')
      const fall = await AsyncStorage.getItem('@healthCare:falls')
      await api.delete(`pacientes/${user?.email as string}/data-last-day`)
      const response = await api.post('data-last-day', {
        steps,
        fall,
        emailPaciente: user?.email as string,
      })
      console.log('RESPONSE NEW DATA', response)
    } catch (error) {
      console.log(error)
    }
  }

  const sendNewMonth = async () => {
    console.log('sending new month')
    try {
      const steps = await AsyncStorage.getItem('@healthCare:steps')
      const fall = await AsyncStorage.getItem('@healthCare:falls')
      await api.delete(`pacientes/${user?.email as string}/data-month`)
      const response = await api.post('data-month', {
        stepsCurrentMonth:
          Number(oldDataMonth?.stepsCurrentMonth) + Number(steps),
        fallCurrentMonth: Number(oldDataMonth?.fallCurrentMonth) + Number(fall),
        stepsLastMonth: oldDataMonth?.stepsCurrentMonth,
        fallLastMonth: oldDataMonth?.stepsCurrentMonth,
        emailPaciente: user?.email as string,
      })
      console.log('RESPONSE NEW DATA', response)
    } catch (error) {
      console.log(error)
    }
  }

  const sendNewYear = async () => {
    console.log('sending new month')
    try {
      await api.delete(`pacientes/${user?.email as string}/data-year`)
      const response = await api.post('data-year', {
        stepsCurrentYear:
          Number(oldDataYear?.stepsCurrentYear) +
          Number(oldDataMonth?.stepsCurrentMonth),
        fallCurrentMonth:
          Number(oldDataYear?.fallCurrentYear) +
          Number(oldDataMonth?.fallCurrentMonth),
        stepsLastMonth: oldDataYear?.stepsCurrentYear,
        fallLastMonth: oldDataYear?.stepsCurrentYear,
        emailPaciente: user?.email as string,
      })
      console.log('RESPONSE NEW DATA', response)
    } catch (error) {
      console.log(error)
    }
  }

  const getPatientData = async (email: string) => {
    const id = email
    try {
      const response = await api.get(`pacientes/${id}`)
      setData(response.data)
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível carregar os dados do paciente.',
        type: 'danger',
      })
    }
  }

  const sendEmail = async (email: string) => {
    try {
      await getPatientData(email)
      setContacts(await getContactsByPatient(email))
      contacts.forEach(contact => {
        console.log(contact.email)
        alertMessage({
          email: contact.email,
          name: data?.name as string,
          local: 'Localização do paciente aqui...',
          bpm: 'Ultimos dados do BPM aqui...',
          atividade: 'Ultimos dados de atividade aqui...',
          oxigenio: 'Ultimos dados de oxigenio aqui...',
        })
      })
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível enviar o email de emergência.',
        type: 'danger',
      })
    }
  }

  //  get permission
  const readData = window.setInterval(async function () {
    // do something
    if (permission) {
      await connectToDevice()
    }
    if (device?.isConnected()) {
      device
        .readCharacteristicForService(
          '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
          'beb5483e-36e1-4688-b7f5-ea07361b26a8'
        )
        .then(result => {
          const str = result.value as string
          console.log('LEU', Buffer.from(str, 'base64').toString('binary'))
          processReceivedData(Buffer.from(str, 'base64').toString('binary'))
        })
        .catch(error => {
          console.log('ERROR', error)
          setDevice(null)
          connectToDevice()
        })
    } else {
      requestScanPermission()
    }
  }, 30000)

  const requestScanPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(result => {
        if (result) {
          console.log('Permission is OK')
          setPermission(true)
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then(result => {
            if (result) {
              console.log('User accept')
              setPermission(true)
            } else {
              console.log('User refuse')
              setPermission(false)
            }
          })
        }
      })
    }
  }
  const connectToDevice = async () => {
    if (device === null)
      manager.startDeviceScan(
        ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'],
        null,
        async (error, device) => {
          if (error) {
            console.log(error)
          }
          console.log(device?.name)
          if (device?.name === 'ESP32') {
            console.log('encontrou ESP32')
            manager.stopDeviceScan()

            device
              .connect()
              .then(device => {
                console.log('conectou')
                setDevice(device)
                return manager.discoverAllServicesAndCharacteristicsForDevice(
                  device.id
                )
              })
              .catch(error => {
                console.log(error)
              })
          }
        }
      )
  }

  const processReceivedData = (data: string) => {
    console.log('process received data', data)
    if (data) {
      const splittedStr = data.split(';')
      console.log('SPLITTED STR', splittedStr)
      // pos 0 -> count of steps
      // pos 1 -> if a fall was detected or not
      //  process fall
      if (splittedStr[1] === '1') {
        console.log('emergency detected')
        setEmergency(true)
      }
      // process steps
      updateLocalSteps(splittedStr[0])
      // process falls
      updateLocalFalls(splittedStr[1])
    }
  }
}
