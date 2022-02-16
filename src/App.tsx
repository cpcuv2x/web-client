import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import DashboardsPage from './pages/Dashboards'
import LoginPage from './pages/Login'
import NotFoundPage from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="dashboards" element={<DashboardsPage />} />
      </Route>
    </Routes>
  )
}

export default App
