import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import FlashMessage from 'react-native-flash-message'

import { AuthProvider } from './src/context/auth'
import { Routes } from './src/routes'

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

const App = () => {
  const [expoToken, setExpoToken] = useState('')

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  useEffect(() => {
    sendPushNotification(expoToken)
  }, [expoToken])

  const sendPushNotification = async (expoPushToken: string) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Alo alo',
      body: 'que doideira essa notificação',
      data: { someData: 'goes here' },
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
      setExpoToken(token)
      /* 
      setState({ expoPushToken: token }) */
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      console.log('here')
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
  }

  return (
    <AuthProvider>
      <Routes />
      <FlashMessage position="bottom" />
    </AuthProvider>
  )
}

export default App
