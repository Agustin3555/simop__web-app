import './styles/index.css'
import '@fontsource-variable/inter'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PrivateInterceptor, PublicInterceptor } from './interceptors'

PublicInterceptor()
PrivateInterceptor()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
