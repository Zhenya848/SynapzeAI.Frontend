import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from './theme.ts'
import { router } from './app/Router.tsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/context/auth/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>,
)
