import React from 'react'
import ReactGridLayout from 'react-grid-layout'
import useDashboard from '../hooks/useDashboard'
import DashboardCard from './DashboardCard'
import Button from 'react-bootstrap/Button'

interface Props {
  dashboardId: string
}

const MOCK_DASHBOARD_ITEM_TO_BE_ADDED = {
  _id: '61de5c12295cc738f774ac4e',
  metadata: 'car1cam1',
  __v: 0,
}

const Dashboard = (props: Props) => {
  const {
    layout,
    updateLayout,
    saveLayout,
    addItem,
    deleteItem,
    loading: dashboardLoading,
    error: dashboardError,
  } = useDashboard(props.dashboardId)

  let inside: React.ReactNode

  if (dashboardError?.statusCode === 401) {
    inside = <React.Fragment>You're not logged in.</React.Fragment>
  } else if (!props.dashboardId) {
    inside = <React.Fragment>Please select dashboard</React.Fragment>
  } else if (dashboardLoading) {
    inside = <React.Fragment>Please wait...</React.Fragment>
  } else if (dashboardError?.statusCode === 404) {
    inside = (
      <React.Fragment>Logged in but selected wrong dashboard.</React.Fragment>
    )
  } else {
    inside = (
      <React.Fragment>
        <ReactGridLayout
          className="layout"
          layout={layout}
          onLayoutChange={updateLayout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          {layout?.map((card) => (
            <div key={card.i}>
              <DashboardCard card={card} deleteItem={deleteItem} />
            </div>
          ))}
        </ReactGridLayout>

        {/* Temporary added */}
        <Button className="dashboard__btn-save" onClick={saveLayout}>
          Save
        </Button>
        <Button
          className="dashboard__btn-test-add-item"
          onClick={() => addItem(MOCK_DASHBOARD_ITEM_TO_BE_ADDED)}
        >
          Test Add Item
        </Button>
      </React.Fragment>
    )
  }

  return <main className="dashboard">{inside}</main>
}

export default Dashboard
