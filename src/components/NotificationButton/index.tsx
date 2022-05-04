import { BellOutlined } from "@ant-design/icons"
import { Avatar, Badge, List, Popover, Tabs } from "antd"
import useNotifications from "../../hooks/socket/useNotifications"
import MarkAsReadIcon from "../Notification/MarkAsReadIcon"
import NotificationItem from "../Notification/NotificationItem"
import styles from "./styles.module.less"

const NotificationButton = () => {
  const { unread, read, totalUnread, totalRead, mutate } = useNotifications()

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      content={
        <Tabs defaultActiveKey="unread" style={{ width: 600 }}>
          <Tabs.TabPane tab={`Unread (${totalUnread})`} key="unread">
            <List
              itemLayout="horizontal"
              dataSource={unread}
              rowKey={(item) => item.id}
              style={{
                maxHeight: 200,
                overflowY: "scroll",
              }}
              renderItem={(item) => (
                <List.Item
                  style={{ paddingRight: 8 }}
                  extra={
                    <MarkAsReadIcon
                      notiId={item.id}
                      mutateNotifications={mutate}
                    />
                  }
                >
                  <NotificationItem notification={item} />
                </List.Item>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={`Read (${totalRead})`} key="read">
            <List
              itemLayout="horizontal"
              dataSource={read}
              rowKey={(item) => item.id}
              style={{
                maxHeight: 200,
                overflowY: "scroll",
              }}
              renderItem={(item) => (
                <List.Item style={{ paddingRight: 8 }}>
                  <NotificationItem notification={item} />
                </List.Item>
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      }
    >
      <div className={styles.container}>
        <Badge count={totalUnread}>
          <Avatar icon={<BellOutlined />} />
        </Badge>
      </div>
    </Popover>
  )
}

export default NotificationButton
