import { Col, Row, Space, Typography } from "antd"
import moment from "moment"
import React from "react"
import { useNavigate } from "react-router-dom"
import { driverGenderLabel, fieldLabel } from "../../../../constants/Driver"
import useDriverInformation from "../../../../hooks/socket/useDriverInformation"
import { routes } from "../../../../routes/constant"
import DriverStatusTag from "../../../DriverStatusTag"
import WidgetCard from "../../WidgetCard"

const { Text, Link } = Typography

interface Props {
  driverId: string
}

const DriverInformation: React.FC<Props> = ({ driverId }: Props) => {
  const driver = useDriverInformation(driverId)
  const navigate = useNavigate()
  return (
    <WidgetCard
      title="Personal information"
      helpText="Driver's personal information."
      content={
        <Row gutter={[16, 16]} wrap>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["firstNameTH"]}</Text>
              <Text type="secondary">{driver?.firstNameTH}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["lastNameTH"]}</Text>
              <Text type="secondary">{driver?.lastNameTH}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["firstNameEN"]}</Text>
              <Text type="secondary">{driver?.firstNameEN}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["lastNameEN"]}</Text>
              <Text type="secondary">{driver?.lastNameEN}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["gender"]}</Text>
              <Text type="secondary">
                {driver?.gender && driverGenderLabel[driver?.gender]}
              </Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["birthDate"]}</Text>
              <Text type="secondary">
                {driver?.birthDate &&
                  moment(driver?.birthDate).format("D MMMM YYYY")}
              </Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["registerDate"]}</Text>
              <Text type="secondary">
                {driver?.registerDate &&
                  moment(driver?.registerDate).format("D MMMM YYYY")}
              </Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["nationalId"]}</Text>
              <Text type="secondary">{driver?.nationalId}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["carDrivingLicenseId"]}</Text>
              <Text type="secondary">{driver?.carDrivingLicenseId}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["username"]}</Text>
              <Text type="secondary">{driver?.User?.username}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>{fieldLabel["status"]}</Text>
              <Text type="secondary">
                <DriverStatusTag status={driver?.status} />
              </Text>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Text strong>Now Driving</Text>
              {driver?.Car ? (
                <Link
                  onClick={() =>
                    navigate(`${routes.DASHBOARD_CAR}/${driver?.Car?.id}`)
                  }
                >
                  {driver?.Car.id}
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

export default DriverInformation
