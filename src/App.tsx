import { Routes, Route, BrowserRouter } from "react-router-dom"
import { SWRConfig } from "swr"
import AppLayout from "./components/AppLayout"
import RequireAuth from "./components/RequireAuth"
import DashboardCarOverviewPage from "./pages/dashboard/Car/Overview"
import DashboardCarPage from "./pages/dashboard/Car/Dashboard"
import DashboardDriverPage from "./pages/dashboard/Driver/Dashboard"
import DashboardOverviewPage from "./pages/dashboard/Overview"
import EntityCameraPage from "./pages/entity/Camera"
import EntityDriverPage from "./pages/entity/Driver"
import LoginPage from "./pages/Login"
import NotFoundPage from "./pages/NotFound"
import axiosFetcher from "./utils/axiosFetcher"
import DashboardDriverOverviewPage from "./pages/dashboard/Driver/Overview"
import EntityCarEditPage from "./pages/entity/Car/Edit"
import EntityCarOverviewPage from "./pages/entity/Car/Overview"

function App() {
  return (
    <SWRConfig value={{ fetcher: axiosFetcher }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route path="dashboard">
              <Route path="overview" element={<DashboardOverviewPage />} />
              <Route path="car">
                <Route index element={<DashboardCarOverviewPage />} />
                <Route path=":carId" element={<DashboardCarPage />} />
              </Route>
              <Route path="driver">
                <Route index element={<DashboardDriverOverviewPage />} />
                <Route path=":driverId" element={<DashboardDriverPage />} />
              </Route>
            </Route>
            <Route path="entity">
              <Route path="camera" element={<EntityCameraPage />} />
              <Route path="car">
                <Route index element={<EntityCarOverviewPage />} />
                <Route path="edit/:carId" element={<EntityCarEditPage />} />
              </Route>
              <Route path="driver" element={<EntityDriverPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  )
}

export default App
