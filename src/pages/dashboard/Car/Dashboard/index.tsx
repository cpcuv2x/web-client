import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"
import { Col, Row, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import CameraStreams from "../../../../components/widgets/CameraStreams"
import AccidentsLogByCar from "../../../../components/widgets/car/AccidentsLogByCar"
import CarInformation from "../../../../components/widgets/car/CarInformation"
import PassengersChart from "../../../../components/widgets/car/PassengersChart"
import useCar from "../../../../hooks/useCar"
import { routes } from "../../../../routes/constant"

const DashboardCarPage: React.FC = () => {
  const { carId } = useParams()

  if (!carId) return <div>Loading...</div>

  const { car, loading, error } = useCar(carId)

  if (loading) return <div>Loading...</div>

  if (error || !car) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>Car: {car.licensePlate} - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Car",
            icon: <CarOutlined />,
            href: routes.DASHBOARD_CAR,
          },
          {
            label: carId,
          },
        ]}
      />

      <Row align="middle">
        <Typography.Title>Car: {car.licensePlate}</Typography.Title>
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
