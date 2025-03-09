import { Route, Routes } from 'react-router'
import App from '@/components/app/App.tsx'
import { Settings } from '@/components/settings/settings.tsx'
import { Home } from '@/components/home/home.tsx'

export function Layout() {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}
