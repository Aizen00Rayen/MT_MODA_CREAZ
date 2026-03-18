import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FAFAFA',
              border: '1px solid #C9A84C',
              fontFamily: '"Josefin Sans", sans-serif',
              letterSpacing: '0.05em',
            },
            success: { iconTheme: { primary: '#C9A84C', secondary: '#0A0A0A' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#0A0A0A' } },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
