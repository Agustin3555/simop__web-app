import { privateInstance } from '@/services/config'
import { addToken, catchError } from './config'

export const PrivateInterceptor = () => {
  privateInstance.interceptors.request.use(addToken)
  privateInstance.interceptors.response.use(undefined, catchError)
}
