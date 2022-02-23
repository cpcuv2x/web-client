import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  AreaChartOutlined,
  CarOutlined,
  CameraOutlined,
  ControlOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import AppHeader from './AppHeader'
import AppBreadcrumb from './AppBreadcrumb'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const defaultOpenKeys = [pathSnippets[0]]
  const defaultSelectedKeys = [pathSnippets.join('-')]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <AppHeader />
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
                <Link to="/dashboard/overview">Overview</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-car" icon={<CarOutlined />}>
                <Link to="/dashboard/car">Car</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-driver" icon={<UserOutlined />}>
                <Link to="/dashboard/driver">Driver</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="entity" icon={<ControlOutlined />} title="Entity">
              <Menu.Item key="entity-camera" icon={<CameraOutlined />}>
                <Link to="/entity/camera">Camera</Link>
              </Menu.Item>
              <Menu.Item key="entity-car" icon={<CarOutlined />}>
                <Link to="/entity/car">Car</Link>
              </Menu.Item>
              <Menu.Item key="entity-driver" icon={<UserOutlined />}>
                <Link to="/entity/driver">Driver</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <AppBreadcrumb />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout
