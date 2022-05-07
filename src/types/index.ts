export type SignInProps = {
  email: string
  password: string
}
export type UserType = 'patient' | 'doctor' | 'temp' | 'confident'

export type SignUpProps = {
  name: string
  cpf: string /* x */
  email: string
  age?: number | null
  phone?: number | null
  password: string
  addressObject: {
    /* x Object -> string */ street: string
    number: number | null
    neighborhood: string
    zipCode: string
  }
  bloodType?: string
  healthProblems?: string
  height?: number | null
  weight?: number | null
  observations?: string
  allergies?: string
  nameC: string
  cpfC: string /* x */
  emailC: string
  phoneC?: number | null
}

export type DataLastDay = {
  id: string
  steps: string
  fall: string
  emailPaciente: string
}

export type DataMonth = {
  id: string
  stepsCurrentMonth: string
  fallCurrentMonth: string
  stepsLastMonth: string
  fallLastMonth: string
  emailPaciente: string
}

export type DataYear = {
  id: string
  stepsCurrentYear: string
  fallCurrentYear: string
  stepsLastYear: string
  fallLastYear: string
  emailPaciente: string
}

export type AlertProps = {
  email: string
  name: string
  local: string
  bpm: string
  atividade: string
  oxigenio: string
}

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

export type Doctor = {
  crm: string
  cpf: string
  email: string
  name: string
  phone: string
  area: string
}

export type Contact = {
  cpf: string
  email: string
  name: string
  phone: string
  type: string
}

export type Mp = {
  id: string
  emailPaciente: string
  emailMedico: string
}

export type SignUpDocProps = {
  name: string
  cpf: string
  crm: string
  email: string
  phone: string
  area: string
  password: string
}

export type Mensagem = {
  email: string
  subject: string
  html: string
}

export type ParamsProfile = {
  Profile: {
    email: string
  }
}

export type FormContact = {
  name: string
  cpf: string /* x */
  email: string
  phone?: number | null
}

export type Pc = {
  id: string
  emailPaciente: string
  emailConfianca: string
}

export type User = {
  email: string
  emailVerified: boolean
  id: string
  realm: string
  username: string
  verificationToken: string
  additionalProps1: { emailPaciente: string }
}

export type AuthContextProps = {
  signed: boolean
  user: User | null
  loading: boolean
  signIn(email: string, password: string): Promise<void>
  signOut(): void
}
