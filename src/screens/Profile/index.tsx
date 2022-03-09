import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'

import { Input } from '../../components/Input'
import { Modal } from '../../components/Modal'
import api from '../../services/api'
import { styles } from './styles'
import { useAuth } from '../../context/auth'

import { useIsFocused, useRoute } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'
import { Patient } from '../../services/doctor'

import { showMessage } from 'react-native-flash-message'

export const Profile = (patient: Patient) => {
  const { user } = useAuth()
  const route = useRoute()
  const [data, setData] = useState<Patient>()
  console.log(route.params)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [allergies, setAllergies] = useState('')
  const [bloodType, setBloodtype] = useState('')
  const [healthProblems, setHealthProblems] = useState('')
  const [phone, setPhone] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [address, setAddress] = useState('')
  const [observations, setObservations] = useState('')

  const [edit, setEdit] = useState(false)
  const { signOut } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const isFocused = useIsFocused()

  const handleOnFillForms = async () => {
    try {
      const url = '/pacientes/' + user?.email
      const response = await api.get(url)
      setData(response.data)
      setName(response.data.name)
      setAge(response.data.age)
      setPhone(response.data.phone)
      setBloodtype(response.data.bloodType)
      setHealthProblems(response.data.healthProblems)
      setHeight(response.data.height)
      setWeight(response.data.weight)
      setAddress(response.data.address)
      setObservations(response.data.observations)
      setAllergies(response.data.allergies)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnSave = async () => {
    try {
      await api.patch(`/pacientes/${user?.email}`, {
        name: name,
        phone: phone,
        age: age,
        address: address,
        bloodType: bloodType,
        healthProblems: healthProblems,
        height: height,
        weight: weight,
        allergies: allergies,
        observations: observations,
      })
      showMessage({
        message: 'Sucesso!',
        description: 'Novas informações salvas com sucesso!',
        type: 'success',
      })
      setEdit(false)
    } catch (error) {
      showMessage({
        message: 'Oops!',
        description: 'Não foi possível editar seus dados',
        type: 'danger',
      })
    }
  }
  useEffect(() => {
    if (isFocused) {
      handleOnFillForms()
    }
  }, [])

  useEffect(() => {
    if (!edit) {
      handleOnFillForms()
    }
  }, [edit])

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 80,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => {
            edit ? setEdit(false) : setEdit(true)
          }}
        >
          <Feather
            name="edit"
            style={{
              fontSize: 16,
              color: '#000',
              letterSpacing: 0.1,
            }}
          >
            {edit ? 'Cancelar' : 'Editar'}
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!edit}
          style={{
            backgroundColor: '#fff',
            width: 80,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => {
            handleOnSave()
          }}
        >
          <Feather
            name="save"
            style={{
              fontSize: 16,
              color: '#000',
              letterSpacing: 0.1,
            }}
          >
            Salvar
          </Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            justifyContent: 'center',
          }}
          onPress={() => setIsVisible(true)}
        >
          <Feather
            name="log-out"
            style={{
              fontSize: 16,
              color: '#D9534F',
              alignSelf: 'center',
              letterSpacing: 0.1,
            }}
          ></Feather>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }}>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            editable={edit}
            value={name}
            onChangeText={value => setName(value)}
          />
          <Input
            name="cpfString"
            label="CPF"
            placeholder="Digite seu cpf"
            maxLength={11}
            keyboardType="numeric"
            editable={false}
            value={data?.cpf}
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            editable={false}
            value={data?.email}
          />

          <Input
            name="age"
            label="Idade"
            placeholder="Digite sua idade"
            keyboardType="numeric"
            editable={edit}
            value={age}
            onChangeText={value => setAge(value)}
          />

          <Input
            name="phone"
            label="Telefone"
            placeholder="Digite seu telefone"
            maxLength={11}
            keyboardType="numeric"
            editable={edit}
            value={phone}
            onChangeText={value => setPhone(value)}
          />
          <Input
            name="address"
            label="Endereço"
            placeholder="Digite seu endereço"
            editable={edit}
            value={address}
            onChangeText={value => setAddress(value)}
          />
          <Input
            name="bloodType"
            label="Tipo Sanguíneo"
            placeholder="Digite seu tipo sanguíneo"
            maxLength={3}
            editable={edit}
            value={bloodType}
            onChangeText={value => setBloodtype(value)}
          />
          <Input
            multiline
            numberOfLines={4}
            name="healthProblems"
            label="Problemas de Saúde"
            placeholder="Informe seus problemas de saúde"
            editable={edit}
            value={healthProblems}
            onChangeText={value => setHealthProblems(value)}
          />
          <Input
            name="height"
            label="Altura"
            placeholder="Digite sua altura"
            keyboardType="numeric"
            editable={edit}
            value={height}
            onChangeText={value => setHeight(value)}
          />
          <Input
            name="weight"
            label="Peso"
            placeholder="Digite seu peso"
            keyboardType="numeric"
            editable={edit}
            value={weight}
            onChangeText={value => setWeight(value)}
          />
          <Input
            multiline
            numberOfLines={4}
            name="allergies"
            label="Alergias"
            placeholder="Informe suas alergias"
            editable={edit}
            value={allergies}
            onChangeText={value => setAllergies(value)}
          />
          <Input
            multiline
            numberOfLines={4}
            name="observations"
            label="Observações"
            placeholder="Algo mais?"
            editable={edit}
            value={observations}
            onChangeText={value => setObservations(value)}
          />
        </ScrollView>
        <Modal
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          title="Tem certeza que deseja sair?"
          description="Caso queira, você retornará a tela inicial do aplicativo."
          options={[
            {
              name: 'Sair',
              onPress: () => signOut(),
            },
          ]}
        />
      </View>
    </View>
  )
}
