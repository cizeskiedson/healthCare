import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Feather } from '@expo/vector-icons'

import { Resume } from '../screens/Resume'
import { History } from '../screens/History'
import { Profile } from '../screens/Profile'
// import { ViewDoc2 } from '../screens/ViewDoc2'
import { ViewDoc2 } from '../screens/ViewDoc2'
import { ProfileDoc } from '../screens/ProfileDoc'
import { Search } from '../screens/Search'
import { CreatePatient } from '../screens/CreatePatient'
import { ViewPatientData } from '../screens/ViewPatientData'

const AppTab = createBottomTabNavigator()
const AppStack = createNativeStackNavigator()

const icons: Record<string, string> = {
  Perfil: 'user',
  Histórico: 'calendar',
  Resumo: 'heart',
  Pacientes: 'activity',
}

type AppProps = {
  id: string
  realm: string
}

const Tabs = ({ id, realm }: AppProps) => {
  return (
    <AppTab.Navigator
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
      {realm === 'patient' ? (
        <>
          <AppTab.Screen name="Resumo" component={Resume} />
          <AppTab.Screen name="Histórico" component={History} />
          <AppTab.Screen
            name="Perfil"
            component={Profile}
            initialParams={{ id: id }}
          />
        </>
      ) : (
        <>
          <AppTab.Screen name="Pacientes" component={ViewDoc2} />
          <AppTab.Screen name="Perfil" component={ProfileDoc} />
        </>
      )}
    </AppTab.Navigator>
  )
}

export const AppRoutes = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={Tabs} />
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
      name="ViewPatientData"
      component={ViewPatientData}
      options={{ headerShown: true, headerTitle: 'Informações do paciente' }}
    />
  </AppStack.Navigator>
)

// export const AppRoutes = ({ id, realm }: AppProps) => {
//   if (realm === 'pacient') {
//     return (
//       <Navigator
//         screenOptions={({ route }) => ({
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: '#92929C',
//           tabBarStyle: {
//             height: 60,
//           },
//           tabBarLabelStyle: {
//             marginBottom: 6,
//           },
//           tabBarIcon: ({ color, size }) => {
//             return (
//               <Feather
//                 name={icons[route.name] as keyof typeof Feather.glyphMap}
//                 color={color}
//                 size={size}
//               />
//             )
//           },
//         })}
//       >
//         <Screen name="Resumo" component={Resume} />
//         <Screen name="Histórico" component={History} />
//         <Screen name="Perfil" component={Profile} initialParams={{ id: id }} />
//       </Navigator>
//     )
//   } else {
//     return (
//       <Navigator
//         screenOptions={({ route }) => ({
//           tabBarActiveTintColor: 'purple',
//           tabBarInactiveTintColor: '#92929C',
//           tabBarStyle: {
//             height: 60,
//           },
//           tabBarLabelStyle: {
//             marginBottom: 6,
//           },
//           tabBarIcon: ({ color, size }) => {
//             return (
//               <Feather
//                 name={icons[route.name] as keyof typeof Feather.glyphMap}
//                 color={color}
//                 size={size}
//               />
//             )
//           },
//         })}
//       >
//         <Screen name="Pacientes" component={ViewDoc} />
//         <Screen name="Perfil" component={ProfileDoc} />
//       </Navigator>
//     )
//   }
// }
