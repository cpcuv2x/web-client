import { Col, Row, Tag } from "antd"
import React from "react"
import useCarInformation from "../../../../hooks/socket/useCarInformation"
import { CarStatus } from "../../../../interfaces/Car"
import WidgetCard from "../../WidgetCard"

interface Props {
  carId: string
}

const CarInformation: React.FC<Props> = ({ carId }: Props) => {
  const car = useCarInformation(carId)

  const Status = () => {
    const label = car?.status === CarStatus.ACTIVE ? "Active" : "Inactive"
    const color = car?.status === CarStatus.ACTIVE ? "success" : "red"
    return <Tag color={color}>{label}</Tag>
  }

  return (
    <WidgetCard
      title={car?.licensePlate}
      helpText="Car information."
      content={
        <Row gutter={8}>
          <Col span={6}>Model: </Col>
          <Col span={18}>{car?.model}</Col>
          {/* //TODO: add driver */}
          {/* <Col span={6}>Driver: </Col>
          <Col span={18}>Somchai</Col> */}
          <Col span={6}>Status: </Col>
          <Col span={18}>
            <Status />
          </Col>
        </Row>
      }
    />
  )
}

export default CarInformation
