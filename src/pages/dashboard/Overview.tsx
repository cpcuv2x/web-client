import { LoadScript } from "@react-google-maps/api"
import { Typography, Row, Col } from "antd"
import { Helmet } from "react-helmet"
import BigNumber from "../../components/widgets/BigNumber"
import CarsLocationMap from "../../components/widgets/CarsLocationMap"

const DashboardOverviewPage = () => {
  return (
    <div>
      <Helmet>
        <title>Overview - Dashboard | 5G-V2X</title>
      </Helmet>
      <Typography.Title>Overview</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <BigNumber
            title={"Active Car(s)"}
            helpText={"Total number of cars that are operating."}
            value={"2 / 3"}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <BigNumber
            title={"Active Driver(s)"}
            helpText={"Total number of drivers that are driving."}
            value={"2 / 5"}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <BigNumber
            title={"Passenger(s)"}
            helpText={"Total number of passengers in all cars."}
            value={"8"}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <BigNumber
            title={"Weekly Accident(s)"}
            helpText={"Total number of accidents occurred in this week."}
            value={"1"}
          />
        </Col>

        <Col span={24}>
          <CarsLocationMap />
        </Col>
      </Row>
    </div>
  )
}

export default DashboardOverviewPage
