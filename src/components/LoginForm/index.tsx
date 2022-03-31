import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, message, Space, Typography } from "antd"
import axios, { AxiosError } from "axios"
import appLogo from "../../assets/app_logo.png"
import useUser from "../../hooks/useUser"
import { LoginFormDto } from "../../interfaces/LoginFormDto"
import { User } from "../../interfaces/User"
import axiosClient from "../../utils/axiosClient"

const { Title } = Typography

const LoginForm = () => {
  const [form] = Form.useForm()
  const { mutate } = useUser()

  const onFinish = async ({ username, password }: LoginFormDto) => {
    try {
      await axiosClient.post<User>("/api/auth/login", {
        username,
        password,
        role: "ADMIN",
      })
      mutate()
    } catch (error) {
      let msg
      if (axios.isAxiosError(error)) {
        msg = (error as AxiosError).response?.data || "Some thing went wrong"
      } else {
        msg = (error as Error).message
      }
      message.error(msg)
    }
  }

  return (
    <Space direction="vertical" align="center">
      <Space direction="vertical" size="middle" align="center">
        <Image src={appLogo} preview={false} width={64} />
        <Title level={3}>5G-V2X | Admin dashboard</Title>
      </Space>

      <Form
        form={form}
        layout="vertical"
        style={{ width: 350 }}
        onFinish={onFinish}
      >
        <Form.Item name="username" required>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" required>
          <Input
            type="password"
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Space>
  )
}

export default LoginForm
