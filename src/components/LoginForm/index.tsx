import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, Space, Typography } from "antd"
import appLogo from "../../assets/app_logo.png"
import useUser from "../../hooks/useUser"
import { LoginDto } from "../../interfaces/LoginFormDto"
import { User, UserRole } from "../../interfaces/User"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"

const { Title } = Typography

const LoginForm = () => {
  const [form] = Form.useForm<LoginDto>()
  const { mutate } = useUser()

  const onFinish = async (values: LoginDto) => {
    try {
      await axiosClient.post<User>("/api/auth/login", {
        username: values.username,
        password: values.password,
        role: UserRole.ADMIN,
      })

      mutate()
    } catch (error) {
      handleError(error)
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
