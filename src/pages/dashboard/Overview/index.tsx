import { AreaChartOutlined, PieChartOutlined } from "@ant-design/icons"
import { Button, Col, Row, Space, Typography } from "antd"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../components/PageBreadcrumb"
import AccidentCount from "../../../components/widgets/overview/AccidentCount"
import ActiveCars from "../../../components/widgets/overview/ActiveCars"
import ActiveDrivers from "../../../components/widgets/overview/ActiveDrivers"
import CarsLocationMap from "../../../components/widgets/overview/CarsLocationMap"
import TotalPassengers from "../../../components/widgets/overview/TotalPassengers"
import { routes } from "../../../routes/constant"

const DashboardOverviewPage: React.FC = () => {
  const [showVehicleID, setShowVehicleID] = useState<boolean>(true)
  const [hideVehicleID, setHideVehicleID] = useState<boolean>(false)

  function showVehicleIDHandle() {
    setShowVehicleID(true)
    const timer = setTimeout(() => {
      setShowVehicleID(false), 200
    })
    return () => clearTimeout(timer)
  }

  function hideVehicleIDHandle() {
    setHideVehicleID(true)
    const timer = setTimeout(() => {
      setHideVehicleID(false), 200
    })
    return () => clearTimeout(timer)
  }

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
      <Row gutter={8} align="bottom" style={{ paddingBottom: "10px" }}>
        <Col span={19}>
          <Typography.Title>Overview</Typography.Title>
        </Col>
        <Col span={5}>
          <Space>
            <Button type="primary" onClick={showVehicleIDHandle}>
              Show
            </Button>
            <Button type="default" danger onClick={hideVehicleIDHandle}>
              Hide
            </Button>
            vehicle id.
          </Space>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={19}>
          <CarsLocationMap
            showVehicleID={showVehicleID}
            hideVehicleID={hideVehicleID}
          />
        </Col>
        <Col span={5}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <ActiveCars />
            </Col>
            <Col span={24}>
              <ActiveDrivers />
            </Col>
            <Col span={24} style={{ height: "285px" }}>
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
