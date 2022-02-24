import { Row, Card } from 'antd'
import { Helmet } from 'react-helmet'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | 5G-V2X</title>
      </Helmet>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Card style={{ borderRadius: 20 }}>
          <LoginForm />
        </Card>
      </Row>
    </>
  )
}

export default LoginPage
