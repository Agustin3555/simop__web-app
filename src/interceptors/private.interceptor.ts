import { privateInstance } from '@/services/config'
import { addToken, catchError } from './config'

export const PrivateInterceptor = () => {
  privateInstance.interceptors.response.use(undefined, catchError)
  privateInstance.interceptors.request.use(addToken)
}
