import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import AppLayout from './components/AppLayout'
import DashboardCarPage from './pages/dashboard/Car'
import DashboardDriverPage from './pages/dashboard/Driver'
import DashboardOverviewPage from './pages/dashboard/Overview'
import EntityCameraPage from './pages/entity/Camera'
import EntityCarPage from './pages/entity/Car'
import EntityDriverPage from './pages/entity/Driver'
import LoginPage from './pages/Login'
import NotFoundPage from './pages/NotFound'
import axiosFetcher from './utils/axiosFetcher'

function App() {
  return (
    <SWRConfig value={{ fetcher: axiosFetcher }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="dashboard">
              <Route path="overview" element={<DashboardOverviewPage />} />
              <Route path="car" element={<DashboardCarPage />} />
              <Route path="driver" element={<DashboardDriverPage />} />
            </Route>
            <Route path="entity">
              <Route path="camera" element={<EntityCameraPage />} />
              <Route path="car" element={<EntityCarPage />} />
              <Route path="driver" element={<EntityDriverPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  )
}

export default App
