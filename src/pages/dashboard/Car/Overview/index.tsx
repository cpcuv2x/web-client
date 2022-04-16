import { AreaChartOutlined, CarOutlined, DownOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Dropdown, Menu, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import useCars from "../../../../hooks/useCars"
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
  const { cars } = useCars()

  const menu = (
    <Menu>
      {cars.map(({ id, licensePlate }) => (
        <Menu.Item key={id}>
          <Link to={id}>{licensePlate}</Link>
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
