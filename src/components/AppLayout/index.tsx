import {
  AreaChartOutlined,
  CameraOutlined,
  CarOutlined,
  ControlOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Layout, Menu, Space } from "antd"
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { routes } from "../../routes/constant"
import AppHeader from "../AppHeader"
import styles from "./styles.module.less"

const { Sider, Content } = Layout
const { SubMenu } = Menu

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const location = useLocation()
  const pathSnippets = location.pathname.split("/").filter((i) => i)
  const defaultOpenKeys = ["dashboard", "entity"]
  const defaultSelectedKeys = [pathSnippets.join("-")]
  // TODO: refactor sider
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          width={250}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
          >
            <SubMenu
              key="dashboard"
              icon={<AreaChartOutlined />}
              title="Dashboard"
            >
              <Menu.Item key="dashboard-overview" icon={<PieChartOutlined />}>
                <Link to={routes.DASHBOARD_OVERVIEW}>Overview</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-car" icon={<CarOutlined />}>
                <Link to={routes.DASHBOARD_CAR}>Car</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-driver" icon={<UserOutlined />}>
                <Link to={routes.DASHBOARD_DRIVER}>Driver</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="entity"
              icon={<ControlOutlined />}
              title="Entity Management"
            >
              {/* <Menu.Item key="entity-camera" icon={<CameraOutlined />}>
                <Link to="/entity/camera">Camera</Link>
              </Menu.Item> */}
              <Menu.Item key="entity-car" icon={<CarOutlined />}>
                <Link to={routes.ENTITY_CAR}>Car</Link>
              </Menu.Item>
              <Menu.Item key="entity-driver" icon={<UserOutlined />}>
                <Link to={routes.ENTITY_DRIVER}>Driver</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className={styles["app-layout"]}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout
