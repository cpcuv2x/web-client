import { AreaChartOutlined, UserOutlined } from "@ant-design/icons"
import { Typography, Row, Col, Breadcrumb } from "antd"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import AccidentsLogByDriver from "../../../../components/widgets/AccidentsLogByDriver"
import DrowsinessLog from "../../../../components/widgets/DrowsinessLog"
import WidgetCard from "../../../../components/widgets/WidgetCard"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC<{ driverId: string }> = ({ driverId }) => (
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
        <Col span={6}>
          <WidgetCard
            title={"Somchai Jaidee"}
            helpText={"Driver information."}
            content={
              <Row gutter={8}>
                <Col span={8}>Gender: </Col>
                <Col span={16}>Male</Col>
                <Col span={8}>Registered: </Col>
                <Col span={16}>15/02/2022</Col>
                <Col span={8}>Status: </Col>
                <Col span={16}>Active</Col>
              </Row>
            }
          />
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
