import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, Space, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import useUser from "../../hooks/useUser"
import axiosClient from "../../utils/axiosClient"
import styles from "./styles.module.less"

const UserBadge = () => {
  const navigate = useNavigate()
  const { user, mutate } = useUser()

  const onLogout = async () => {
    await axiosClient.post("/api/auth/logout")
    mutate(null)
    navigate("/")
  }

  const menu = (
    <Menu>
      <Menu.Item danger key="logout">
        <Space onClick={onLogout}>
          <LogoutOutlined /> <Typography.Text>Logout</Typography.Text>
        </Space>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Space className={styles.container}>
        <Avatar icon={<UserOutlined />} />
        {user && <Typography.Text strong>{user?.username}</Typography.Text>}
      </Space>
    </Dropdown>
  )
}

export default UserBadge
