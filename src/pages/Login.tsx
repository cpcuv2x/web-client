import { Card, Row } from "antd"
import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import useUser from "../hooks/useUser"
import { routes } from "../routes/constant"

const LoginPage = () => {
  const { user, loggedOut } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !loggedOut) {
      navigate(routes.DASHBOARD_OVERVIEW)
    }
  }, [user, loggedOut])

  return (
    <>
      <Helmet>
        <title>Login | 5G-V2X</title>
      </Helmet>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Card style={{ borderRadius: 20 }}>
          <LoginForm />
        </Card>
      </Row>
    </>
  )
}

export default LoginPage
