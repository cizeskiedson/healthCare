import api from '../../services/api'
import { AlertProps } from '../../types'

export const alertMessage = (props: AlertProps) => {
  try {
    api.post('message', {
      email: props.email,
      subject: 'Alerta de Emergência!',
      html: `<h1>ATENÇÃO!</h1> <h2> Uma emergência foi detectada</h2> <p> O paciente ${props.name} pode estar em risco! </p> <strong>Local: </strong> <p> ${props.local} </p> <strong>BPM: </strong> <p> ${props.bpm} </p> <strong>Atividade recente: </strong> <p> ${props.atividade} </p> <strong>Oxigênio no sangue: </strong> <p> ${props.oxigenio} </p> <p> Essa é uma mensagem automática. </p>`,
    })
  } catch (error) {
    console.log('FALHA NO ENVIO DO ALERTA', error)
  }
}
