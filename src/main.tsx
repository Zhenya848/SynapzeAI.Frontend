import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from './theme.ts'
import { router } from './app/Router.tsx'
import { RouterProvider } from 'react-router-dom'
import { store } from './app/store.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>,
)
