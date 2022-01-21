import React from 'react'
import useDashboards from '../hooks/useDashboards'
import './DashboardsList.scss'

interface Props {
  setSelectedDashboardId: React.Dispatch<React.SetStateAction<string>>
}

const DashboardsList = (props: Props) => {
  const { dashboards, loading, error } = useDashboards()

  let inside: React.ReactNode
  if (loading) {
    inside = <React.Fragment>Please wait...</React.Fragment>
  } else if (error?.statusCode === 401) {
    inside = <React.Fragment>You're not logged in.</React.Fragment>
  } else {
    inside = (
      <React.Fragment>
        {dashboards?.map((dashboard: any) => (
          <div
            className="dashboards-list--dashboards-list-item"
            onClick={() => {
              props.setSelectedDashboardId(dashboard._id)
            }}
            key={dashboard._id}
          >
            {dashboard.name}
          </div>
        ))}
      </React.Fragment>
    )
  }
  return <aside className="dashboards-list">{inside}</aside>
}

export default DashboardsList
