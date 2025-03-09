import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from '@/components/ui/provider.tsx'
import { Layout } from '@/components/layout/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Layout />
    </Provider>
  </StrictMode>,
)
