import {
  AreaChartOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Button, Dropdown, Menu, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item href={routes.DASHBOARD_OVERVIEW}>
      <AreaChartOutlined />
      <span>Dashboard</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.DASHBOARD_DRIVER}>
      <UserOutlined />
      <span>Driver</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const DashboardDriverOverviewPage: React.FC = () => {
  // FIXME: use real drivers data
  const drivers = [
    { id: "driver-1", firstName: "Somchai", lastName: "Jaidee" },
    { id: "driver-2", firstName: "Somying", lastName: "Jaideemark" },
    { id: "driver-3", firstName: "Sommai", lastName: "Jairai" },
  ]

  const menu = (
    <Menu>
      {drivers.map(({ id, firstName, lastName }) => (
        <Menu.Item key={id}>
          <Link to={id}>
            {firstName} {lastName}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <>
      <Helmet>
        <title>Drivers - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>Drivers Dashboard</Typography.Title>

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Select a driver <DownOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export default DashboardDriverOverviewPage
