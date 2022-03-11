import { AreaChartOutlined, PieChartOutlined } from "@ant-design/icons"
import { Typography, Row, Col, Breadcrumb } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import BigNumber from "../../components/widgets/BigNumber"
import CarsLocationMap from "../../components/widgets/CarsLocationMap"
import { routes } from "../../routes/constant"

const PageBreadcrumb: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item href={routes.DASHBOARD_OVERVIEW}>
      <AreaChartOutlined />
      <span>Dashboard</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.DASHBOARD_OVERVIEW}>
      <PieChartOutlined />
      <span>Overview</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const DashboardOverviewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Overview - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

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
    </>
  )
}

export default DashboardOverviewPage
