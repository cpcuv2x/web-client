import { AreaChartOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Col, Empty, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent"
import useDriversStatus from "../../../../hooks/useDriversStatus"
import { routes } from "../../../../routes/constant"

const DashboardDriverOverviewPage: React.FC = () => {
  const { drivers } = useDriversStatus()
  const [statusFullSize] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (drivers)
      navigate(
        `${routes.DASHBOARD_DRIVER}/` +
          (drivers.length > 0 ? drivers[0].id : "")
      )
  }, [drivers])

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
          <Card>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardDriverOverviewPage
