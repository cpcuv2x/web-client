import { useState } from 'react'
import DashboardList from '../components/DashboardList'
import Dashboard from '../components/Dashboard'

const Dashboards = () => {
  const [selectedDashboardId, setSelectedDashboardId] = useState('')

  return (
    <div className="dashboards">
      <DashboardList
        selectedDashboardId={selectedDashboardId}
        setSelectedDashboardId={setSelectedDashboardId}
      />
      <Dashboard dashboardId={selectedDashboardId} />
    </div>
  )
}

export default Dashboards
