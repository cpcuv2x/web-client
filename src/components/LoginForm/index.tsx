import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, Typography, Image, Space } from 'antd'
import appLogo from '../../assets/app_logo.png'

const { Title } = Typography

const LoginForm = () => {
  const [form] = Form.useForm()
  return (
    <Space direction="vertical" align="center">
      <Space direction="vertical" size="middle" align="center">
        <Image src={appLogo} preview={false} width={64} />
        <Title level={3}>5G-V2X | Admin dashboard</Title>
      </Space>

      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        style={{ width: 350 }}
      >
        <Form.Item name="username" required>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item required>
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
