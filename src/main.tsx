import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from '@/components/ui/provider.tsx'
import { RouteList } from '@/components/layout/route-list.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouteList />
    </Provider>
  </StrictMode>,
)
