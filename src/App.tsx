import { ConfigProvider } from "antd"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"
import AppLayout from "./components/AppLayout"
import RequireAuth from "./components/RequireAuth"
import DashboardCarPage from "./pages/dashboard/Car/Dashboard"
import DashboardCarOverviewPage from "./pages/dashboard/Car/Overview"
import DashboardDriverPage from "./pages/dashboard/Driver/Dashboard"
import DashboardDriverOverviewPage from "./pages/dashboard/Driver/Overview"
import DashboardOverviewPage from "./pages/dashboard/Overview"
import EntityCameraPage from "./pages/entity/Camera"
import EntityCarEditPage from "./pages/entity/Car/Edit"
import EntityCarNewPage from "./pages/entity/Car/New"
import EntityCarOverviewPage from "./pages/entity/Car/Overview"
import EntityDriverNewPage from "./pages/entity/Driver/New"
import EntityDriverOverviewPage from "./pages/entity/Driver/Overview"
import LoginPage from "./pages/Login"
import NotFoundPage from "./pages/NotFound"
import axiosFetcher from "./utils/axiosFetcher"

const validateMessages = {
  required: "This field is required",
}

function App() {
  return (
    <ConfigProvider form={{ validateMessages }}>
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
                  <Route path="new" element={<EntityCarNewPage />} />
                  <Route path="edit/:carId" element={<EntityCarEditPage />} />
                </Route>
                <Route path="driver">
                  <Route index element={<EntityDriverOverviewPage />} />
                  <Route path="new" element={<EntityDriverNewPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </ConfigProvider>
  )
}

export default App
