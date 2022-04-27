import { AreaChartOutlined, UserOutlined } from "@ant-design/icons"
import { Col, Row, Typography } from "antd"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import AccidentsLogByDriver from "../../../../components/widgets/AccidentsLogByDriver"
import DriverECRChart from "../../../../components/widgets/driver/DriverECRChart"
import DriverInformation from "../../../../components/widgets/driver/DriverInformation"
import DrowsinessLog from "../../../../components/widgets/DrowsinessLog"
import { routes } from "../../../../routes/constant"

const DashboardDriverPage = () => {
  const { driverId } = useParams()

  if (!driverId) return <div>Loading...</div>

  return (
    <>
      <Helmet>
        <title>Driver({driverId}) - Dashboard | 5G-V2X</title>
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

      <Typography.Title>Driver: {driverId}</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DriverInformation driverId={driverId} />
        </Col>
        <Col span={24}>
          <DriverECRChart driverId={driverId} />
        </Col>
        <Col span={24}>
          <DrowsinessLog driverId={driverId} />
        </Col>
        <Col span={24}>
          <AccidentsLogByDriver driverId={driverId} />
        </Col>
      </Row>
    </>
  )
}

export default DashboardDriverPage
