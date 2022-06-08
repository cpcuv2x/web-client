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
import { transform } from "lodash"

const DashboardCarComponent: React.FC<{ carId:string , setStatusFullsize:any, statusFullSize:boolean}> = ({carId, setStatusFullsize, statusFullSize}) => {

  const navigate = useNavigate()

  const { car, loading, error } = useCar(carId)

  if (car === undefined) return <div>Loading...</div>

  if (loading) return <div>Loading...</div>

  if (error || !car) return <div>An error occurred.</div>

  return (
    <>
      <Row justify="space-between" style={{margin:10}}>
        <Col>
          <Space>
            <Button 
              onClick={()=>{setStatusFullsize(!statusFullSize)}}
              icon = {statusFullSize ? <LeftOutlined/>: <RightOutlined/>}
              style = {{width:30, height: 30}}>
            </Button>
            <Typography.Title level={3} style = {{transform:"translate(0%, 10%)"}}>Car: {car.licensePlate}</Typography.Title>
          </Space>
        </Col>
        <Col>
          <Button
            style={{width:"100%", transform:"translate(0%, 30%)"}}
            type="primary"
            icon={<ControlOutlined />}
            onClick={() => {
              navigate(`${routes.ENTITY_CAR}?id=${carId}`)
            }}>
            Manage car
          </Button>
        </Col>
      </Row>

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
