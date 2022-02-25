import { Dropdown, Avatar, Menu, Space, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import styles from './styles.module.less'

const UserBadge = () => {
  // TODO: use actually user and logout
  const user = {
    username: 'John Doe',
  }

  const logout = () => {
    console.log('logout!')
  }

  const menu = (
    <Menu>
      <Menu.Item danger key="logout">
        <Space onClick={logout}>
          <LogoutOutlined /> <Typography.Text>Logout</Typography.Text>
        </Space>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Space className={styles.container}>
        <Avatar icon={<UserOutlined />} />
        <Typography.Text strong>{user.username}</Typography.Text>
      </Space>
    </Dropdown>
  )
}

export default UserBadge
