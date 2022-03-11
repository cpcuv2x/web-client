import React from "react"
import { Card, Tooltip } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
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
      bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
      title={<span className={styles["card-title"]}>{title}</span>}
      extra={
        <Tooltip title={helpText}>
          <InfoCircleOutlined className={styles["info-icon"]} />
        </Tooltip>
      }
    >
      {content}
    </Card>
  )
}

export default WidgetCard
