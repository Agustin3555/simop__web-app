import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

export const publicInstance = axios.create({ baseURL })
export const privateInstance = axios.create({ baseURL })
