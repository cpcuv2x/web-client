import { InfoCircleOutlined } from "@ant-design/icons"
import { Card, Tooltip, Typography } from "antd"
import React from "react"
import styles from "./styles.module.less"

interface Props {
  content: React.ReactNode
  title: React.ReactNode
  helpText: React.ReactNode
}

const WidgetCard: React.FC<Props> = ({ content, title, helpText }) => {
  return (
    <Card
      className={styles["card"]}
      bodyStyle={{
        paddingTop: 12,
        paddingBottom: 12,
        height: "100%",
      }}
      title={<Typography.Text type="secondary">{title}</Typography.Text>}
      extra={
        <Tooltip title={helpText}>
          <InfoCircleOutlined style={{ color: "rgba(255, 255, 255, 0.45)" }} />
        </Tooltip>
      }
    >
      {content}
    </Card>
  )
}

export default WidgetCard
