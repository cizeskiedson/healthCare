import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Feather } from '@expo/vector-icons'

import { Resume } from '../screens/Resume'
import { History } from '../screens/History'
import { Profile } from '../screens/Profile'

const { Navigator, Screen } = createBottomTabNavigator()

const icons: Record<string, string> = {
  Profile: 'user',
  History: 'calendar',
  Resume: 'heart',
}

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: '#92929C',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          marginBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          return (
            <Feather
              name={icons[route.name] as keyof typeof Feather.glyphMap}
              color={color}
              size={size}
            />
          )
        },
      })}
    >
      <Screen name="Resume" component={Resume} />
      <Screen name="History" component={History} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  )
}
