import { ConfigProvider } from "antd"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"
import AppLayout from "./components/AppLayout"
import RequireAuth from "./components/RequireAuth"
import SocketContext, { socket } from "./contexts/socket/SocketContext"
import DashboardCarPage from "./pages/dashboard/Car/Dashboard"
import DashboardCarOverviewPage from "./pages/dashboard/Car/Overview"
import DashboardDriverPage from "./pages/dashboard/Driver/Dashboard"
import DashboardDriverOverviewPage from "./pages/dashboard/Driver/Overview"
import DashboardOverviewPage from "./pages/dashboard/Overview"
import EntityCameraEditPage from "./pages/entity/Camera/Edit"
import EntityCameraNewPage from "./pages/entity/Camera/New"
import EntityCameraOverviewPage from "./pages/entity/Camera/Overview"
import EntityCarEditPage from "./pages/entity/Car/Edit"
import EntityCarNewPage from "./pages/entity/Car/New"
import EntityCarOverviewPage from "./pages/entity/Car/Overview"
import EntityDriverEditPage from "./pages/entity/Driver/Edit"
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
    <SocketContext.Provider value={socket}>
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
                  <Route path="car">
                    <Route index element={<EntityCarOverviewPage />} />
                    <Route path="new" element={<EntityCarNewPage />} />
                    <Route path="edit/:carId" element={<EntityCarEditPage />} />
                  </Route>
                  <Route path="driver">
                    <Route index element={<EntityDriverOverviewPage />} />
                    <Route path="new" element={<EntityDriverNewPage />} />
                    <Route
                      path="edit/:driverId"
                      element={<EntityDriverEditPage />}
                    />
                  </Route>
                  <Route path="camera">
                    <Route index element={<EntityCameraOverviewPage />} />
                    <Route path="new" element={<EntityCameraNewPage />} />
                    <Route
                      path="edit/:cameraId"
                      element={<EntityCameraEditPage />}
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SWRConfig>
      </ConfigProvider>
    </SocketContext.Provider>
  )
}

export default App
