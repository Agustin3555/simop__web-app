import './styles/index.css'
import '@fontsource-variable/inter'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
