import { useState } from 'react'
import DashboardsList from '../components/DashboardsList'
import Dashboard from '../components/Dashboard'
import './Dashboards.scss'

const Dashboards = () => {
  const [selectedDashboardId, setSelectedDashboardId] = useState('')

  return (
    <div className="dashboards">
      <DashboardsList setSelectedDashboardId={setSelectedDashboardId} />
      <Dashboard dashboardId={selectedDashboardId} />
    </div>
  )
}

export default Dashboards
