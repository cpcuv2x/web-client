import { Col, Image, Row } from "antd"
import moment from "moment"
import React from "react"
import appConfig from "../../../../configuration"
import useDriverInformation from "../../../../hooks/socket/useDriverInformation"
import WidgetCard from "../../WidgetCard"

interface Props {
  driverId: string
}

const DriverInformation: React.FC<Props> = ({ driverId }: Props) => {
  const driver = useDriverInformation(driverId)
  // TODO: add driver status
  return (
    <Row gutter={8}>
      <Col span={4}>
        <Image
          src={`${appConfig.webServicesURL}api/drivers/images/${driver?.imageFilename}`}
        />
      </Col>
      <Col span={20}>
        <WidgetCard
          title="Personal information"
          helpText="Driver's personal information."
          content={
            <Row gutter={8} wrap>
              {/* TODO: add driver's gender */}
              {/* <Col span={8}>Gender: </Col>
          <Col span={16}>Male</Col> */}
              <Col span={12}>First Name: </Col>
              <Col span={12}>{driver?.firstName}</Col>
              <Col span={12}>Last Name: </Col>
              <Col span={12}>{driver?.lastName}</Col>
              <Col span={12}>Birth Date: </Col>
              <Col span={12}>
                {driver?.birthDate &&
                  moment(driver?.birthDate).format("DD/MM/YYYY")}
              </Col>
              <Col span={12}>National ID: </Col>
              <Col span={12}>{driver?.nationalId}</Col>
              <Col span={12}>Car Driving License No.: </Col>
              <Col span={12}>{driver?.carDrivingLicenseId}</Col>
            </Row>
          }
        />
      </Col>
    </Row>
  )
}

export default DriverInformation
