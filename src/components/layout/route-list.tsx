import { Route, Routes } from 'react-router'
import App from '@/components/app/App.tsx'
import { Settings } from '@/components/settings/settings.tsx'
import { Home } from '@/components/home/home.tsx'
import { StartingPage } from '@/pages/StartingPage.tsx'
import { Capec2CVEPage } from '@/pages/Capec2CVEPage.tsx'
import { MitigationsDetectionsPage } from '@/pages/MitigationsDetectionsPage.tsx'
import { ChatPage } from '@/pages/ChatPage.tsx'

export function RouteList() {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='/start' element={<StartingPage />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/capec2cve' element={<Capec2CVEPage />} />
        <Route
          path='/mitigations-detections'
          element={<MitigationsDetectionsPage />}
        />
        <Route path='/chat' element={<ChatPage />} />
      </Route>
    </Routes>
  )
}
