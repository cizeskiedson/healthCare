import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Modal } from 'react-native'
import { styles } from './styles'
import { useAuth } from '../../context/auth'

export const Profile = () => {
  const { signOut } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Perfil</Text>
        <Modal visible={isVisible} transparent style={{}}>
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
                  Tem certeza que quer sair?
                </Text>
                <Text style={{ color: '#959595', marginTop: 8 }}>
                  Caso queira, você retornará a tela inicial do aplicativo.
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
                  onPress={() => setIsVisible(false)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#00042c',
                    }}
                  >
                    Voltar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 22,
                    backgroundColor: '#D9534F',
                    borderRadius: 8,
                  }}
                  onPress={signOut}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#00042c',
                    }}
                  >
                    Sim
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: '#D9534F',
            borderRadius: 8,
          }}
          onPress={() => setIsVisible(true)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
              alignSelf: 'center',
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
