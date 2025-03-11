import { Route, Routes } from 'react-router'
import App from '@/components/app/App.tsx'
import { Settings } from '@/components/settings/settings.tsx'
import { Home } from '@/components/home/home.tsx'
import DashboardPage from '@/pages/DashboardPage.tsx'
import DatasetsPage from '@/pages/DatasetsPage.tsx'
import CheckpointsPage from '@/pages/CheckpointsPage.tsx'
import TrainingPage from '@/pages/TrainingPage.tsx'
import LoadModelPage from '@/pages/LoadModelPage.tsx'
import InferencePage from '@/pages/InferencePage.tsx'
import { StartingPage } from '@/pages/StartingPage.tsx'

export function RouteList() {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='/start' element={<StartingPage />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/datasets' element={<DatasetsPage />} />
        <Route path='/checkpoints' element={<CheckpointsPage />} />
        <Route path='/training' element={<TrainingPage />} />
        <Route path='/load-model' element={<LoadModelPage />} />
        <Route path='/inference' element={<InferencePage />} />
      </Route>
    </Routes>
  )
}
