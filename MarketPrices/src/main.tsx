import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppContextProvider from './context/AppContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
  </AppContextProvider>
)
