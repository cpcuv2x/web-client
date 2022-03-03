import { BellOutlined } from "@ant-design/icons"
import { Avatar, Badge, Card, Dropdown } from "antd"
import styles from "./styles.module.less"

const NotificationButton = () => {
  // TODO: render real notifications
  return (
    <Dropdown
      overlay={
        <Card style={{ width: 300, height: 100 }} title="Notification"></Card>
      }
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className={styles.container}>
        <Badge count={3}>
          <Avatar icon={<BellOutlined />} />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default NotificationButton
