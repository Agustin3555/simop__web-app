import { AppError, ERRORS, getErrorInterpretation } from '@/helpers'

export const catchError = (error: any) => {
  // console.log({ error })

  // Se verifica si la solicitud a la API se ha completado
  if (error.response) {
    const apiErrorCode = error.response.data.errorCode

    // Se verifica si existe un código de error dado por la API
    if (apiErrorCode) return new AppError(apiErrorCode)
    else {
      // No existe el código de error, por lo tanto es un error "no controlado"

      const errorMessage = getErrorInterpretation(ERRORS.unknown)
    }
  } else {
    // No se ha completado la solicitud, el error se ha producido

    const axiosErrorCode = error.code

    let errorMessage = getErrorInterpretation(axiosErrorCode)

    if (!errorMessage) {
      /*
        No se puede interpretar el error, por lo tanto es un error "no
        controlado".
      */

      errorMessage = getErrorInterpretation(ERRORS.unknown)
    }

    return
  }
}
