import {
  AreaChartOutlined,
  CameraOutlined,
  CarOutlined,
  ControlOutlined,
  HeartOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { routes } from "../../routes/constant"
import AppHeader from "../AppHeader"
import styles from "./styles.module.less"

const { Sider, Content } = Layout
const { SubMenu } = Menu

const AppLayout = () => {
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  useEffect(() => {
    const pathSnippets = location.pathname
      .split("/")
      .filter((i) => i)
      .slice(0, 2)
    setSelectedKeys([pathSnippets.join("-")])
  }, [location.pathname])

  // TODO: refactor sider
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <Sider collapsible width={250} theme="light">
          <Menu
            theme="light"
            mode="inline"
            defaultOpenKeys={["dashboard", "entity"]}
            selectedKeys={selectedKeys}
          >
            <SubMenu
              key="dashboard"
              icon={<AreaChartOutlined />}
              title="Dashboard"
            >
              <Menu.Item key="dashboard-overview" icon={<PieChartOutlined />}>
                <Link to={routes.DASHBOARD_OVERVIEW}>Overview</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-vehicle" icon={<CarOutlined />}>
                <Link to={routes.DASHBOARD_CAR}>Vehicle</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-driver" icon={<UserOutlined />}>
                <Link to={routes.DASHBOARD_DRIVER}>Driver</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-heartbeat" icon={<HeartOutlined />}>
                <Link to={routes.DASHBOARD_HEARTBEAT}>Heatbeat</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="entity"
              icon={<ControlOutlined />}
              title="Entity Management"
            >
              <Menu.Item key="entity-camera" icon={<CameraOutlined />}>
                <Link to={routes.ENTITY_CAMERA}>Camera</Link>
              </Menu.Item>
              <Menu.Item key="entity-car" icon={<CarOutlined />}>
                <Link to={routes.ENTITY_CAR}>Vehicle</Link>
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
