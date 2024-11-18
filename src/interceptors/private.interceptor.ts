import { addToken, catchError } from './modifiers'
import { privateInstance } from '@/helpers'

export const PrivateInterceptor = () => {
  privateInstance.interceptors.response.use(undefined, catchError)
  privateInstance.interceptors.request.use(addToken)
}
