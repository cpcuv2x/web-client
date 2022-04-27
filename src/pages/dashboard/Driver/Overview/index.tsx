import {
  AreaChartOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Dropdown, Menu, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useDrivers from "../../../../hooks/useDrivers"
import { routes } from "../../../../routes/constant"

const DashboardDriverOverviewPage: React.FC = () => {
  const { drivers } = useDrivers()

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

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Select a driver <DownOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export default DashboardDriverOverviewPage
