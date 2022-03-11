import { Typography, Row, Col, DatePicker } from "antd"
import { Helmet } from "react-helmet"
import AccidentsLogByCar from "../../components/widgets/AccidentsLogByCar"
import BigNumber from "../../components/widgets/BigNumber"
import CameraStreams from "../../components/widgets/CameraStreams"
import PassengersChart from "../../components/widgets/PassengersChart"
import WidgetCard from "../../components/widgets/WidgetCard"

const DashboardCarPage = () => {
  return (
    <div>
      <Helmet>
        <title>Car - Dashboard | 5G-V2X</title>
      </Helmet>
      <Typography.Title>Car (AA-0000)</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <WidgetCard
            title={"AA-0000"}
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
        <Col span={6}>
          <BigNumber
            title={"Current Passenger(s)"}
            helpText={"Total number of passengers in this car."}
            value={"8"}
          />
        </Col>
        <Col span={24}>
          <PassengersChart carId="AA-0000" />
        </Col>
        <Col span={24}>
          <CameraStreams carId="AA-0000" />
        </Col>
        <Col span={24}>
          <AccidentsLogByCar carId="AA-0000" />
        </Col>
      </Row>
    </div>
  )
}

export default DashboardCarPage
