import { publicInstance } from '@/services/config'
import { catchError } from './config'

export const PublicInterceptor = () => {
  publicInstance.interceptors.response.use(undefined, catchError)
}
