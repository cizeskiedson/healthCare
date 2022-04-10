import api from '../api'
import { Patient } from '../../types'

export const getPatientsByDoctor = async (
  doctorEmail: string
): Promise<Patient[]> => {
  const { data } = await api.get(`medicos/${doctorEmail}/pacientes`)

  return data
}

export const getPatients = async (): Promise<Patient[]> => {
  const { data } = await api.get('pacientes')

  return data
}
