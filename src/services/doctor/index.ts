import api from '../api'

export type Patient = {
  address: string
  age: string
  allergies: string
  birthDate: string
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

export const getPatientsByDoctor = async (
  doctorEmail: string
): Promise<Patient[]> => {
  const { data } = await api.get(`medicos/${doctorEmail}/pacientes`)

  return data
}
