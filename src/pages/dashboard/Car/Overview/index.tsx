import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"
import { Card, Col, Menu, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useCars from "../../../../hooks/useCars"
import { routes } from "../../../../routes/constant"

import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent/index"
import DashboardCarComponent from "../../../../components/StatusDashboard/CarDashBoard"

const DashboardOverviewPage: React.FC = () => {

  const { cars } = useCars()

  const [ statusFullSize, setStatusFullSize ] = useState<boolean>(true)
  const [ id, setID ] = useState<string>("")

  useEffect(()=>{
    if(cars) setID(cars.length>0 ? cars[0].id : "")
  }, [cars])

  return (
    <>
      <Helmet>
        <title>Cars - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Car",
            icon: <CarOutlined />,
            href: routes.DASHBOARD_CAR,
          },
        ]}
      />

      <Typography.Title>Cars Dashboard</Typography.Title>
      <Row>
        <Col span = {5}>
          <StatusTableComponent data = {cars} idSetter = {setID} size = {statusFullSize}/>
        </Col>
        <Col span = {19}>
          <Card size="small">
            <DashboardCarComponent carId={id}/>
          </Card>
        </Col>
      </Row>
    </>
  )

}

export default DashboardOverviewPage
