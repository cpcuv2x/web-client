import { Col, Image, Layout, Row, Space, Typography } from 'antd'
import appLogo from '../../assets/app_logo.png'
import styles from './styles.module.less'
import NotificationButton from '../NotificationButton'
import UserBadge from '../UserBadge'

const { Title } = Typography
const { Header } = Layout

const AppHeader = () => (
  <Header className={styles['app-header']}>
    <Row align="middle" justify="space-between">
      <Col>
        <Space size="middle">
          <Image src={appLogo} preview={false} width={32} />
          <Title level={2} className={styles['app-title']}>
            5G-V2X
          </Title>
        </Space>
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
