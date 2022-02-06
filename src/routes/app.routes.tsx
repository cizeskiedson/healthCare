import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Feather } from '@expo/vector-icons'

import { Resume } from '../screens/Resume'
import { History } from '../screens/History'
import { Profile } from '../screens/Profile'
import { ViewDoc } from '../screens/ViewDoc'
import { Text } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

const icons: Record<string, string> = {
  Perfil: 'user',
  Histórico: 'calendar',
  Resumo: 'heart',
  Pacientes: 'activity',
}

type AppProps = {
  realm: string
}
export const AppRoutes = ({ realm }: AppProps) => {
  if (realm === 'pacient') {
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
        <Screen name="Resumo" component={Resume} />
        <Screen name="Histórico" component={History} />
        <Screen name="Perfil" component={Profile} />
      </Navigator>
    )
  } else {
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
        <Screen name="Pacientes" component={ViewDoc} />
        <Screen name="Perfil" component={Profile} />
      </Navigator>
    )
  }
}
