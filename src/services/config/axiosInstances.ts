import { apiUrl } from '@/env'
import axios from 'axios'

const baseURL = apiUrl

export const publicInstance = axios.create({ baseURL })
export const privateInstance = axios.create({ baseURL })
