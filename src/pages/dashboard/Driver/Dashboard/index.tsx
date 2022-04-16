import { AreaChartOutlined, UserOutlined } from "@ant-design/icons"
import { Breadcrumb, Col, Row, Typography } from "antd"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import AccidentsLogByDriver from "../../../../components/widgets/AccidentsLogByDriver"
import DriverInformation from "../../../../components/widgets/driver/DriverInformation"
import DrowsinessLog from "../../../../components/widgets/DrowsinessLog"
import { routes } from "../../../../routes/constant"

interface PageBreadcrumbProps {
  driverId: string
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  driverId,
}: PageBreadcrumbProps) => (
  <Breadcrumb>
    <Breadcrumb.Item href={routes.DASHBOARD_OVERVIEW}>
      <AreaChartOutlined />
      <span>Dashboard</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.DASHBOARD_DRIVER}>
      <UserOutlined />
      <span>Driver</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>{driverId}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const DashboardDriverPage = () => {
  const { driverId } = useParams()

  if (!driverId) return <div>Loading...</div>

  return (
    <>
      <Helmet>
        <title>Driver({driverId}) - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb driverId={driverId} />

      <Typography.Title>Driver: {driverId}</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DriverInformation driverId={driverId} />
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
