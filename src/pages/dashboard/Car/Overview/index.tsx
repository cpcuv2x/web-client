import { AreaChartOutlined, CarOutlined, DownOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Dropdown, Menu, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useCars from "../../../../hooks/useCars"
import { routes } from "../../../../routes/constant"

const DashboardOverviewPage: React.FC = () => {
  const { cars } = useCars()

  const menu = (
    <Menu>
      {cars.map(({ id, licensePlate }) => (
        <Menu.Item key={id}>
          <Link to={id}>
            {licensePlate} ({id})
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

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

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Select a car <DownOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export default DashboardOverviewPage
