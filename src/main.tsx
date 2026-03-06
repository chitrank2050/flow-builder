import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import reportWebVitals from './lib/reportAppVitals'

import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// only runs on `vite build`, never in dev
if (import.meta.env.PROD) {
  reportWebVitals()
}
