import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAuth } from '../context/auth'
import { Feather } from '@expo/vector-icons'

import { Resume } from '../screens/Resume'
import { History } from '../screens/History'
import { Profile } from '../screens/Profile'
import { ViewDoc } from '../screens/ViewDoc'
import { ProfileDoc } from '../screens/ProfileDoc'
import { Search } from '../screens/Search'
import { CreatePatient } from '../screens/CreatePatient'
import { ChangePassword } from '../screens/ChangePassword'
import { Contacts } from '../screens/Contacts'
import { CreateContact } from '../screens/CreateContact'
import { colors } from '../styles/colors'
import { useRoute } from '@react-navigation/native'
import { BluetoothModule } from '../utils/bluetooth'

const AppTab = createBottomTabNavigator()
const AppStack = createNativeStackNavigator()

const icons: Record<string, string> = {
  Perfil: 'user',
  Histórico: 'calendar',
  Resumo: 'heart',
  Pacientes: 'activity',
  Contatos: 'phone',
}

const TabsDoctor = () => {
  return (
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: colors.gray,
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
      <>
        <AppTab.Screen name="Pacientes" component={ViewDoc} />
        <AppTab.Screen name="Perfil" component={ProfileDoc} />
      </>
    </AppTab.Navigator>
  )
}

const TabsPatient = () => {
  /*  console.log('start bluetooth module')
  BluetoothModule() */
  const route = useRoute()
  return (
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: colors.gray,
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
      <>
        <AppTab.Screen
          name="Resumo"
          component={Resume}
          initialParams={route.params}
        />
        <AppTab.Screen
          name="Histórico"
          component={History}
          initialParams={route.params}
        />
        <AppTab.Screen
          name="Contatos"
          component={Contacts}
          initialParams={route.params}
        />
        <AppTab.Screen
          name="Perfil"
          component={Profile}
          initialParams={route.params}
        />
      </>
    </AppTab.Navigator>
  )
}

const TabsConfident = () => {
  const route = useRoute()
  return (
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: colors.gray,
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
      <>
        <AppTab.Screen
          name="Resumo"
          component={Resume}
          initialParams={route.params}
        />
        <AppTab.Screen
          name="Histórico"
          component={History}
          initialParams={route.params}
        />
      </>
    </AppTab.Navigator>
  )
}

const TabsPatientToDoctor = () => {
  const route = useRoute()
  console.log('PARAMS', route.params)
  return (
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: colors.gray,
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
      <>
        <AppTab.Screen
          name="Resumo"
          component={Resume}
          initialParams={route.params}
        />
        <AppTab.Screen
          name="Histórico"
          component={History}
          initialParams={route.params}
        />
        <AppTab.Screen
          name="Perfil"
          component={Profile}
          initialParams={route.params}
        />
      </>
    </AppTab.Navigator>
  )
}

export const AppRoutes = () => {
  const { user } = useAuth()
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user?.realm === 'patient' ? (
        <AppStack.Screen
          name="Home"
          component={TabsPatient}
          initialParams={{ email: user?.email }}
        />
      ) : user?.realm === 'doctor' ? (
        <AppStack.Screen
          name="Home"
          component={TabsDoctor}
          initialParams={{ id: user?.email, realm: user?.realm }}
        />
      ) : user?.realm === 'temp' ? (
        <AppStack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: true,
            headerTitle: 'Alteração de senha',
          }}
        />
      ) : (
        <AppStack.Screen name="Home" component={TabsConfident} />
      )}
      <AppStack.Screen
        name="PatientData"
        component={TabsPatientToDoctor}
        options={{ headerShown: true, headerTitle: 'Dados do paciente' }}
      />
      <AppStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: true, headerTitle: 'Buscar usuário' }}
      />
      <AppStack.Screen
        name="CreatePatient"
        component={CreatePatient}
        options={{ headerShown: true, headerTitle: 'Cadastrar paciente' }}
      />
      <AppStack.Screen
        name="CreateContact"
        component={CreateContact}
        options={{ headerShown: true, headerTitle: 'Cadastrar contato' }}
      />
    </AppStack.Navigator>
  )
}
