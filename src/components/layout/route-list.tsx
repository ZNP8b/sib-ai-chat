import { Route, Routes } from 'react-router'
import App from '@/components/app/App.tsx'
import { Settings } from '@/components/settings/settings.tsx'
import { Home } from '@/components/home/home.tsx'
import { StartingPage } from '@/pages/StartingPage.tsx'
import { Capec2CVEPage } from '@/pages/Capec2CVEPage.tsx'
import { MitigationsDetectionsPage } from '@/pages/MitigationsDetectionsPage.tsx'

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
        {/*<Route path='/dashboard' element={<DashboardPage />} />*/}
        {/*<Route path='/datasets' element={<DatasetsPage />} />*/}
        {/*<Route path='/checkpoints' element={<CheckpointsPage />} />*/}
        {/*<Route path='/training' element={<TrainingPage />} />*/}
        {/*<Route path='/load-model' element={<LoadModelPage />} />*/}
        {/*<Route path='/inference' element={<InferencePage />} />*/}
      </Route>
    </Routes>
  )
}
