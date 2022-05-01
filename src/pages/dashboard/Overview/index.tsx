import { AreaChartOutlined, PieChartOutlined } from "@ant-design/icons"
import { Col, Row, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../components/PageBreadcrumb"
import AccidentCount from "../../../components/widgets/overview/AccidentCount"
import ActiveCars from "../../../components/widgets/overview/ActiveCars"
import ActiveDrivers from "../../../components/widgets/overview/ActiveDrivers"
import CarsLocationMap from "../../../components/widgets/overview/CarsLocationMap"
import TotalPassengers from "../../../components/widgets/overview/TotalPassengers"
import { routes } from "../../../routes/constant"

const DashboardOverviewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Overview - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Overview",
            icon: <PieChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
        ]}
      />

      <Typography.Title>Overview</Typography.Title>

      <Row gutter={8}>
        <Col span={19}>
          <CarsLocationMap />
        </Col>
        <Col span={5}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <ActiveCars />
            </Col>
            <Col span={24}>
              <ActiveDrivers />
            </Col>
            <Col span={24}>
              <TotalPassengers />
            </Col>
            <Col span={24}>
              <AccidentCount />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default DashboardOverviewPage
