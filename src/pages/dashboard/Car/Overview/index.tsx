import { AreaChartOutlined, CarOutlined, DownOutlined } from "@ant-design/icons"
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
    <Breadcrumb.Item href={routes.DASHBOARD_CAR}>
      <CarOutlined />
      <span>Car</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const DashboardOverviewPage: React.FC = () => {
  // FIXME: use real cars data
  const cars = [
    { id: "car-1", licensePlate: "AA-0000" },
    { id: "car-2", licensePlate: "AA-0001" },
    { id: "car-3", licensePlate: "AA-0002" },
  ]

  const menu = (
    <Menu>
      {cars.map(({ id, licensePlate }) => (
        <Menu.Item key={id}>
          <Link to={licensePlate}>{licensePlate}</Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <Helmet>
        <title>Cars - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>Cars Dashboard</Typography.Title>

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Select a car <DownOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export default DashboardOverviewPage
