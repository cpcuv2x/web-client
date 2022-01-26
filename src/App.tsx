import { Routes, Route, Outlet } from 'react-router-dom'
import { SWRConfig } from 'swr'
import Dashboards from './pages/Dashboards'
import Layout from './components/Layout'
import Cars from './pages/Cars'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import axiosFetcher from './utils/axiosFetcher'
import RequireAuth from './utils/RequireAuth'

function App() {
  return (
    <SWRConfig value={{ fetcher: axiosFetcher }}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <Layout>
                <Outlet />
              </Layout>
            </RequireAuth>
          }
        >
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/cars" element={<Cars />} />
        </Route>
      </Routes>
    </SWRConfig>
  )
}

export default App
