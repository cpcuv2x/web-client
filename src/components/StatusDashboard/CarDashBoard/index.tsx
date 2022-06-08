import {
  ControlOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import { Button, Col, Row, Space, Typography } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import PageBreadcrumb from "../../PageBreadcrumb"
import CameraStreams from "../../widgets/CameraStreams"
import AccidentsLogByCarTable from "../../widgets/car/AccidentsLogByCarTable"
import CarImage from "../../widgets/car/CarImage"
import CarInformation from "../../widgets/car/CarInformation"
import PassengersChart from "../../widgets/car/PassengersChart"
import useCar from "../../../hooks/useCar"
import { routes } from "../../../routes/constant"

const DashboardCarComponent: React.FC<{ carId:string , setStatusFullsize:any, statusFullSize:boolean}> = ({carId, setStatusFullsize, statusFullSize}) => {

  const navigate = useNavigate()

  const { car, loading, error } = useCar(carId)

  if (car === undefined) return <div>Loading...</div>

  if (loading) return <div>Loading...</div>

  if (error || !car) return <div>An error occurred.</div>

  return (
    <>
      <Space size={10}>
        <Button onClick={()=>{setStatusFullsize(!statusFullSize)}}>
          {statusFullSize&&<LeftOutlined/>}
          {!statusFullSize&&<RightOutlined/>}
        </Button>
        <PageBreadcrumb items={[{ label: (<>{carId}</>)}]}/>
      </Space>

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
