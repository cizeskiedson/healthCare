import React from 'react'
import FlashMessage from 'react-native-flash-message'

import { AuthProvider } from './src/context/auth'
import { Routes } from './src/routes'

/* 
const BACKGROUND_FETCH_TASK = 'background-fetch'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log('DEFINE TASK')
  const now = Date.now()

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  )

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData
})

async function initBackgroundFetch(taskName: string, interval = 60 * 1) {
  console.log('TRYING TO INIT BACKGROUND FETCH')
  try {
    console.log('ENTERED TRY')
    if (!TaskManager.isTaskDefined(taskName)) {
      console.log('IS NOT DEFINED')
    }
    console.log('INTERVAL', interval)
    const options = {
      minimumInterval: interval, // in seconds
    }
    console.log('TASK NAME')
    if (TaskManager.isTaskDefined(taskName)) {
      console.log('REALLY DEFINED')
      if (await TaskManager.isAvailableAsync()) {
        console.log('CAN USE')
      }
    }
    const response = await BackgroundFetch.registerTaskAsync(taskName, options)
    console.log('RESPONSE', response)
  } catch (err) {
    console.log('registerTaskAsync() failed:', err)
  }
}
initBackgroundFetch(BACKGROUND_FETCH_TASK) */

const App = () => {
  return (
    <AuthProvider>
      <Routes />
      <FlashMessage position="bottom" />
    </AuthProvider>
  )
}

export default App
