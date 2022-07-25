import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"
import { Card, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import DashboardCarComponent from "../../../../components/StatusDashboard/CarDashBoard"
import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent"
import useCar from "../../../../hooks/useCar"
import useCarsStatus from "../../../../hooks/useCarsStatus"
import { routes } from "../../../../routes/constant"

const DashboardCarPage: React.FC = () => {
  const { vehicleId } = useParams()
  const { cars } = useCarsStatus()

  const [statusFullSize, setStatusFullSize] = useState<boolean>(true)

  if (!vehicleId) return <div>Loading...</div>

  const { car, loading, error } = useCar(vehicleId)

  if (loading) return <div>Loading...</div>

  if (error || !car) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>Vehicles - Dashboard | 5G-V2X1234</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Vehicle",
            icon: <CarOutlined />,
            href: routes.DASHBOARD_CAR,
          },
          {
            label: vehicleId,
          },
        ]}
      />

      <Typography.Title>Vehicle Dashboard</Typography.Title>
      <Row>
        <Col span={statusFullSize ? 5 : 0}>
          <StatusTableComponent
            data={cars}
            statusFullSize={statusFullSize}
            route={routes.DASHBOARD_CAR}
          />
        </Col>
        <Col span={statusFullSize ? 19 : 24}>
          <Card size="small">
            <DashboardCarComponent
              carId={vehicleId}
              setStatusFullsize={setStatusFullSize}
              statusFullSize={statusFullSize}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardCarPage
