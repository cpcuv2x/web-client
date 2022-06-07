import {
  AreaChartOutlined,
  CarOutlined,
  ControlOutlined,
} from "@ant-design/icons"
import { Button, Col, Row, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import CopyToClipboardButton from "../../CopyToClipboardButton"
import PageBreadcrumb from "../../PageBreadcrumb"
import CameraStreams from "../../widgets/CameraStreams"
import AccidentsLogByCarTable from "../../widgets/car/AccidentsLogByCarTable"
import CarImage from "../../widgets/car/CarImage"
import CarInformation from "../../widgets/car/CarInformation"
import PassengersChart from "../../widgets/car/PassengersChart"
import useCar from "../../../hooks/useCar"
import { routes } from "../../../routes/constant"

// Change this to recieve data from its parent 
const DashboardCarComponent: React.FC<{carId:string}> = ({carId}) => {

  const navigate = useNavigate()

  if (!carId) return <div>Loading...</div>

  const { car, loading, error } = useCar(carId)

  if (loading) return <div>Loading...</div>

  if (error || !car) return <div>An error occurred.</div>

  return (
    <>

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
            label: (
              <>
                {carId}
              </>
            ),
          },
        ]}
      />

      <Typography.Title>
        <Row justify="space-between">
          <Col>Car: {car.licensePlate}</Col>
          <Col>
            <Button
              type="primary"
              icon={<ControlOutlined />}
              onClick={() => {
                navigate(`${routes.ENTITY_CAR}?id=${carId}`)
              }}
            >
              Manage car
            </Button>
          </Col>
        </Row>
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CarImage carId={carId} />
        </Col>
        <Col span={18}>
          <PassengersChart carId={carId} />
        </Col>
        <Col span={24}>
          <CarInformation carId={carId} />
        </Col>
        <Col span={24}>
          <CameraStreams carId={carId} />
        </Col>
        <Col span={24}>
          <AccidentsLogByCarTable carId={carId} />
        </Col>
      </Row>
    </>
  )
}

export default DashboardCarComponent
