import api from '../api'

import { Contact } from '../../types'

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
