import { useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import './Dashboards.scss'
import GridLayout from 'react-grid-layout'

const fetcher = async (path: string) => {
  const response = await axios.get(path)
  return response.data
}

const Dashboards = () => {
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ])

  const { data: dashboardsData, error: dashboardsError } = useSWR(
    '/api/dashboards',
    fetcher
  )
  const [selectedDashboardId, setSelectedDashboardId] = useState('')
  const { data: dashboardData, error: dashboardError } = useSWR(
    `/api/dashboards/${selectedDashboardId}`,
    fetcher
  )

  let dashboardListChild
  if (!dashboardsData && !dashboardsError) {
    dashboardListChild = <>Please wait...</>
  } else if (dashboardsError?.response?.status === 401) {
    dashboardListChild = <>You're not logged in.</>
  } else {
    dashboardListChild = (
      <>
        {dashboardsData?.map((dashboard: any) => (
          <div
            className="dashboard-list--dashboard-list-item"
            onClick={() => {
              setSelectedDashboardId(dashboard._id)
            }}
            key={dashboard._id}
          >
            {dashboard.name}
          </div>
        ))}
      </>
    )
  }

  let mainChild
  if (!dashboardData && !dashboardError) {
    mainChild = <>Please wait...</>
  } else if (dashboardError?.response?.status === 401) {
    mainChild = <>You're not logged in.</>
  } else if (dashboardError?.response?.status === 404) {
    mainChild = <>Logged in but selected wrong dashboard.</>
  } else {
    mainChild = (
      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={(x: any) => {
          setLayout(x)
          console.log(x)
        }}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a" style={{ background: 'tomato' }}>
          a
        </div>
        <div key="b" style={{ background: 'tomato' }}>
          b
        </div>
        <div key="c" style={{ background: 'tomato' }}>
          c
        </div>
      </GridLayout>
    )
  }

  return (
    <div className="dashboards">
      <aside className="dashboards--dashboard-list">{dashboardListChild}</aside>
      <main className="dashboards--main">{mainChild}</main>
    </div>
  )
}

export default Dashboards
