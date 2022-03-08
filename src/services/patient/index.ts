import api from '../api'

export type Patient = {
  address: string
  age: string
  allergies: string
  bloodType: string
  cpf: string
  email: string
  healthProblems: string
  height: string
  name: string
  observations: string
  phone: string
  weight: string
}

export type Contact = {
  cpf: string
  email: string
  name: string
  phone: string
  type: string
}

export const getContactsByPatient = async (
  patientEmail: string
): Promise<Contact[]> => {
  const { data } = await api.get(`pacientes/${patientEmail}/confiancas`)

  return data
}

export const getContacts = async (): Promise<Contact[]> => {
  const { data } = await api.get('confiancas')

  return data
}
