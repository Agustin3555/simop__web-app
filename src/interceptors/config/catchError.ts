import { AppError } from '@/services/config'
import { AxiosError } from 'axios'

interface ApiErrorData {
  code?: string
}

export const catchError = (error: AxiosError) => {
  let code: string | undefined = undefined

  if (error.response) {
    /*
      La API respondió, pero con un código de estado fuera del rango 2xx.
      Esto incluye errores como 4xx (errores del cliente) y 5xx (errores del
      servidor). Extraemos un código de error personalizado enviado en la
      respuesta.
    */
    code = (error.response.data as ApiErrorData).code
  } else if (error.request) {
    /*
      La solicitud fue enviada, pero no se recibió respuesta.
      Esto puede ocurrir por problemas de red o porque el servidor no
      respondió.
    */
    code = error.code
  }

  /*
    Si el error no tiene respuesta ni solicitud, se trata de un problema
    inesperado como un error en la configuración de Axios o un problema del
    cliente.
    En todos los casos, convertimos el error en una instancia de AppError para
    manejarlo de manera consistente.
  */
  return Promise.reject(new AppError(code))
}
