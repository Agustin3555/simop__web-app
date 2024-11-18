import { catchError } from './modifiers'
import { publicInstance } from '@/helpers'

export const PublicInterceptor = () => {
  publicInstance.interceptors.response.use(undefined, catchError)
}
