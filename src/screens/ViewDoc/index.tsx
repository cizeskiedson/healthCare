import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Button, Modal } from 'react-native'

import { Searchbar, DataTable } from 'react-native-paper'

import { Feather } from '@expo/vector-icons'
import { styles } from './styles'

import { useAuth } from '../../context/auth'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

const numberOfItemsPerPageList = [2, 3, 4]

export const ViewDoc = () => {
  const { user, signOut } = useAuth()
  const navigation = useNavigation()
  let email = ''
  if (user != null) {
    email = user.email
  }
  const [loadingData, setLoadingData] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState([])

  const [page, setPage] = React.useState(0)
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  )
  const from = page * numberOfItemsPerPage
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length)

  const navigateToSignUp = () => {
    setIsVisible(false)

    setTimeout(() => {
      navigation.navigate('SignUp', { userType: 'doctor' })
    }, 200)
  }

  const navigateToSearch = () => {
    setIsVisible(false)

    setTimeout(() => {
      navigation.navigate('Search')
    }, 200)
  }

  useEffect(() => {
    async function getData() {
      const url = 'medicos/' + email + '/pacientes'
      await api.get(url).then(response => {
        // check if the data is populated
        console.log(response.data)
        setData(response.data)
        // you tell it that you had the result
        setLoadingData(false)
      })
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData()
    }
  }, [])

  useEffect(() => {
    setPage(0)
  }, [numberOfItemsPerPage])
  return (
    <View style={styles.container}>
      {loadingData ? (
        <Text>Carregando dados...</Text>
      ) : (
        <>
          <Searchbar placeholder="Buscar paciente..." />
          <View style={styles.content}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Nome</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title numeric>Age</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>{data[1].name}</DataTable.Cell>
                <DataTable.Cell>john@kindacode.com</DataTable.Cell>
                <DataTable.Cell numeric>12</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Bob</DataTable.Cell>
                <DataTable.Cell>test@test.com</DataTable.Cell>
                <DataTable.Cell numeric>105</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Mei</DataTable.Cell>
                <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
                <DataTable.Cell numeric>23</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${data.length}`}
                showFastPaginationControls
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={numberOfItemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                selectPageDropdownLabel={'Rows per page'}
              />
            </DataTable>
          </View>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setIsVisible(true)}
          >
            <Feather
              name="plus"
              style={{
                fontSize: 16,
                color: '#000',
                letterSpacing: 0.5,
              }}
            >
              Adicionar novo paciente
            </Feather>
          </TouchableOpacity>
          <Modal
            visible={isVisible}
            transparent
            style={{}}
            onRequestClose={() => setIsVisible(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 14,
              }}
            >
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  padding: 14,
                  borderRadius: 8,
                }}
              >
                <View>
                  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                    Associar novo paciente
                  </Text>
                  <Text style={{ color: '#959595', marginTop: 8 }}>
                    Precisamos que informe se deseja buscar um usuário no
                    sistema, ou se deseja cadastrar um novo paciente.
                  </Text>

                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#D9D9D9',
                      marginVertical: 20,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 22,
                      backgroundColor: '#1dd3f8',
                      borderRadius: 8,
                    }}
                    onPress={() => navigateToSearch()}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#00042c',
                      }}
                    >
                      Buscar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 22,
                      backgroundColor: '#00042c',
                      borderRadius: 8,
                    }}
                    onPress={() => navigateToSignUp()}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#1dd3f8',
                      }}
                    >
                      Novo paciente
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  )
}
