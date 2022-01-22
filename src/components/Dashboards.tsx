import { useState } from 'react'
import DashboardsList from './DashboardsList'
import Dashboard from './Dashboard'
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
