import React from 'react'
import useDashboards from '../hooks/useDashboards'
import './DashboardsList.scss'

interface Props {
  setSelectedDashboardId: React.Dispatch<React.SetStateAction<string>>
}

const DashboardsList = (props: Props) => {
  const {
    dashboards,
    loading,
    error,
    handleCreateDashboard,
    handleUpdateDashboard,
    handleDeleteDashboard,
  } = useDashboards()

  const handlePromptCreateDashboard = () => {
    const name = prompt('New dashboard name', 'untitied-1')
    if (name != null) {
      handleCreateDashboard({ name })
    }
  }

  const handlePromptRenameDashboard = async (id: string) => {
    const name = prompt('New dashboard name', 'untitied-1')
    if (name != null) {
      await handleUpdateDashboard(id, { name })
    }
  }

  const handleConfirmDeleteDashboard = (id: string) => {
    const sure = confirm('Delete, sure?')
    if (sure) {
      handleDeleteDashboard(id)
    }
  }

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
            <span className="dashboards-list-item--btn-group">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePromptRenameDashboard(dashboard._id)
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleConfirmDeleteDashboard(dashboard._id)
                }}
              >
                X
              </button>
            </span>
            {dashboard.name}
          </div>
        ))}
        <span className="dashboards-list--bottom">
          <button onClick={handlePromptCreateDashboard}>
            Create new dashboard
          </button>
        </span>
      </React.Fragment>
    )
  }
  return <aside className="dashboards-list">{inside}</aside>
}

export default DashboardsList
