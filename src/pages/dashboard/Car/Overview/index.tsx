import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"
import { Card, Col, Empty, Row, Skeleton, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useCarsStatus from "../../../../hooks/useCarsStatus"
import { routes } from "../../../../routes/constant"
import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent/index"
import { useNavigate } from "react-router-dom"

const DashboardOverviewPage: React.FC = () => {
  const { cars } = useCarsStatus()
  const [statusFullSize] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (cars)
      navigate(`${routes.DASHBOARD_CAR}/` + (cars.length > 0 ? cars[0].id : ""))
  }, [cars])

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
          <Card>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardOverviewPage
