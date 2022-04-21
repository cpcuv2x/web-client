import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"
import { Breadcrumb, Col, Row, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import CopyToClipboardButton from "../../../../components/CopyToClipboardButton"
import CameraStreams from "../../../../components/widgets/CameraStreams"
import AccidentsLogByCar from "../../../../components/widgets/car/AccidentsLogByCar"
import CarInformation from "../../../../components/widgets/car/CarInformation"
import PassengersChart from "../../../../components/widgets/car/PassengersChart"
import { routes } from "../../../../routes/constant"

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

      <Row align="middle">
        <Typography.Title>
          Car: {carId} <CopyToClipboardButton text={carId} />
        </Typography.Title>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CarInformation carId={carId} />
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
