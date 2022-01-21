import { Routes, Route } from 'react-router-dom'
import Dashboards from './components/Dashboards'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboards" element={<Dashboards />} />
      </Routes>
    </Layout>
  )
}

export default App
