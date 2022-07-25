import { AreaChartOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Col, Row, Typography } from "antd"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import DashboardDriverComponent from "../../../../components/StatusDashboard/DriverDashboard"
import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent"
import useDriversStatus from "../../../../hooks/useDriversStatus"
import { routes } from "../../../../routes/constant"

const DashboardDriverPage = () => {
  const { driverId } = useParams()
  const { drivers } = useDriversStatus()
  const [statusFullSize, setStatusFullSize] = useState<boolean>(true)

  if (!driverId) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>Drivers - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Driver",
            icon: <UserOutlined />,
            href: routes.DASHBOARD_DRIVER,
          },
          {
            label: driverId,
          },
        ]}
      />

      <Typography.Title>Drivers Dashboard</Typography.Title>

      <Row>
        <Col span={statusFullSize ? 5 : 0}>
          <StatusTableComponent
            data={drivers}
            statusFullSize={statusFullSize}
            route={routes.DASHBOARD_DRIVER}
          />
        </Col>
        <Col span={statusFullSize ? 19 : 24}>
          <Card size="small">
            <DashboardDriverComponent
              driverId={driverId}
              setStatusFullSize={setStatusFullSize}
              statusFullSize={statusFullSize}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardDriverPage
