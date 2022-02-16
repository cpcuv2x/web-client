import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import DashboardsPage from './pages/Dashboards'
import LoginPage from './pages/Login'
import NotFoundPage from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboards" element={<DashboardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
