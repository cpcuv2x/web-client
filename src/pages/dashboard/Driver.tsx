import { Typography, Row, Col } from "antd"
import { Helmet } from "react-helmet"
import AccidentsLogByDriver from "../../components/widgets/AccidentsLogByDriver"
import DrowsinessLog from "../../components/widgets/DrowsinessLog"
import WidgetCard from "../../components/widgets/WidgetCard"

const DashboardDriverPage = () => {
  return (
    <div>
      <Helmet>
        <title>Driver - Dashboard | 5G-V2X</title>
      </Helmet>
      <Typography.Title>Driver (Driver-0000)</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <WidgetCard
            title={"Somchai Jaidee"}
            helpText={"Driver information."}
            content={
              <Row gutter={8}>
                <Col span={8}>Gender: </Col>
                <Col span={16}>Male</Col>
                <Col span={8}>Registered: </Col>
                <Col span={16}>15/02/2022</Col>
                <Col span={8}>Status: </Col>
                <Col span={16}>Active</Col>
              </Row>
            }
          />
        </Col>
        <Col span={24}>
          <DrowsinessLog driverId="Driver-0000" />
        </Col>
        <Col span={24}>
          <AccidentsLogByDriver driverId="Driver-0000" />
        </Col>
      </Row>
    </div>
  )
}

export default DashboardDriverPage
