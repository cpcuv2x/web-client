import {
  AreaChartOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Card, Col, Dropdown, Menu, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import DashboardDriverComponent from "../../../../components/StatusDashboard/DriverDashboard"
import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent"
import useDrivers from "../../../../hooks/useDrivers"
import { routes } from "../../../../routes/constant"

const DashboardDriverOverviewPage: React.FC = () => {
  const { drivers } = useDrivers()
  const [ statusFullSize, setStatusFullSize ] = useState<boolean>(true)
  const [ id, setID ] = useState<string>("")

  useEffect(()=>{
    if(drivers) {
      setID(drivers.length>0 ? drivers[0].id : "")
    }
  }, [drivers])

  return (
    <>
      <Helmet>
        <title>Drivers - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Driver",
            icon: <UserOutlined />,
            href: routes.DASHBOARD_DRIVER,
          },
        ]}
      />

      <Typography.Title>Drivers Dashboard</Typography.Title>

      <Row>
        <Col span = {statusFullSize ? 5 : 0}>
          <StatusTableComponent data = {drivers} idSetter = {setID} statusFullSize = {statusFullSize}/>
        </Col>
        <Col span = {statusFullSize ? 19 : 24}>
          <Card size="small">
           <DashboardDriverComponent driverId={id} setStatusFullSize = {setStatusFullSize} statusFullSize = {statusFullSize}/>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardDriverOverviewPage
