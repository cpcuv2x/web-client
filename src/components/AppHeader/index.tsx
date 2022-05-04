import { Col, Image, Layout, Row, Space, Typography } from "antd"
import { Link } from "react-router-dom"
import appLogo from "../../assets/app_logo.png"
import NotificationButton from "../NotificationButton"
import UserBadge from "../UserBadge"
import styles from "./styles.module.less"

const { Title } = Typography
const { Header } = Layout

const AppHeader = () => (
  <Header className={styles["app-header"]}>
    <Row align="middle" justify="space-between">
      <Col>
        <Link to="/">
          <Space size="middle">
            <Image src={appLogo} preview={false} width={28} />
            <Title level={3} className={styles["app-title"]}>
              5G-V2X
            </Title>
          </Space>
        </Link>
      </Col>
      <Col>
        <Space>
          <NotificationButton />
          <UserBadge />
        </Space>
      </Col>
    </Row>
  </Header>
)

export default AppHeader
