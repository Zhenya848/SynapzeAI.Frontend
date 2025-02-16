import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from './theme.ts'
import { router } from './app/Router.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
     <RouterProvider router={router} />
  </ThemeProvider>,
)
