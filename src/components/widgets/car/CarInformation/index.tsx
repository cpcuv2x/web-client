import { Col, Row, Space, Typography } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { fieldLabel } from "../../../../constants/Car"
import useCarInformation from "../../../../hooks/socket/useCarInformation"
import { routes } from "../../../../routes/constant"
import CarStatusTag from "../../../CarStatusTag"
import WidgetCard from "../../WidgetCard"

const { Text, Link } = Typography

interface Props {
  carId: string
}

const CarInformation: React.FC<Props> = ({ carId }: Props) => {
  const car = useCarInformation(carId)
  const navigate = useNavigate()
  return (
    <WidgetCard
      title="Information"
      helpText="Car information."
      content={
        <Row gutter={[16, 16]} wrap>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["licensePlate"]}</Text>
              <Text type="secondary">{car?.licensePlate}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["model"]}</Text>
              <Text type="secondary">{car?.model}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["passengers"]}</Text>
              <Text type="secondary">{car?.passengers}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["status"]}</Text>
              <Text type="secondary">
                <CarStatusTag status={car?.status} />
              </Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>Now being driven By</Text>
              {car?.Driver ? (
                <Link
                  onClick={() =>
                    navigate(`${routes.DASHBOARD_DRIVER}/${car?.Driver?.id}`)
                  }
                >
                  {car?.Driver.firstNameTH}
                </Link>
              ) : (
                <Text type="secondary">-</Text>
              )}
            </Space>
          </Col>
        </Row>
      }
    />
  )
}

export default CarInformation
