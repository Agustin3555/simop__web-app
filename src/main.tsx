import './styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivateInterceptor, PublicInterceptor } from './interceptors'
import App from './App'

PublicInterceptor()
PrivateInterceptor()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
