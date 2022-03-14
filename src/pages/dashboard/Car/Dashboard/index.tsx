import React from "react"
import { useParams } from "react-router-dom"
import { Typography, Row, Col, Breadcrumb } from "antd"
import { Helmet } from "react-helmet"
import AccidentsLogByCar from "../../../../components/widgets/AccidentsLogByCar"
import CameraStreams from "../../../../components/widgets/CameraStreams"
import PassengersChart from "../../../../components/widgets/PassengersChart"
import WidgetCard from "../../../../components/widgets/WidgetCard"
import { routes } from "../../../../routes/constant"
import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"

const PageBreadcrumb: React.FC<{ carId: string }> = ({ carId }) => (
  <Breadcrumb>
    <Breadcrumb.Item href={routes.DASHBOARD_OVERVIEW}>
      <AreaChartOutlined />
      <span>Dashboard</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.DASHBOARD_CAR}>
      <CarOutlined />
      <span>Car</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>{carId}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const DashboardCarPage: React.FC = () => {
  const { carId } = useParams()

  if (!carId) return <div>Loading...</div>

  return (
    <>
      <Helmet>
        <title>Car({carId}) - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb carId={carId} />

      <Typography.Title>Car: {carId}</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <WidgetCard
            title={carId}
            helpText={"Car information."}
            content={
              <Row gutter={8}>
                <Col span={6}>Model: </Col>
                <Col span={18}>T1</Col>
                <Col span={6}>Driver: </Col>
                <Col span={18}>Somchai</Col>
                <Col span={6}>Status: </Col>
                <Col span={18}>Active</Col>
              </Row>
            }
          />
        </Col>
        <Col span={18}>
          <PassengersChart carId={carId} />
        </Col>
        <Col span={24}>
          <CameraStreams carId={carId} />
        </Col>
        <Col span={24}>
          <AccidentsLogByCar carId={carId} />
        </Col>
      </Row>
    </>
  )
}

export default DashboardCarPage
