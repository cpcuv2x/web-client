import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Col, List, Row, Space, Typography } from "antd"
import moment from "moment"
import React from "react"
import { NotificationInfo } from "../../../interfaces/Notification"
import { getNotificationTitle } from "../../../utils/notification"

interface Props {
  notification: NotificationInfo
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  return (
    <List.Item.Meta
      title={
        <Row justify="space-between" gutter={8}>
          <Col>
            <Space>
              <ExclamationCircleOutlined />
              {getNotificationTitle(notification.Notification.type)}
            </Space>
          </Col>
          <Col style={{ paddingRight: 12 }}>
            <Typography.Text type="secondary">
              {moment(notification.Notification.timestamp).fromNow()}
            </Typography.Text>
          </Col>
        </Row>
      }
      description={notification.Notification.message}
    />
  )
}

export default NotificationItem
