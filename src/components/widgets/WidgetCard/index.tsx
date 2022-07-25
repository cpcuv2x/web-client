import { InfoCircleOutlined } from "@ant-design/icons"
import { Card, Tooltip, Typography } from "antd"
import React from "react"
import styles from "./styles.module.less"

interface Props {
  content: React.ReactNode
  title: React.ReactNode
  helpText: React.ReactNode
  padding?: number
}

const WidgetCard: React.FC<Props> = ({
  content,
  title,
  helpText,
  padding = 12,
}) => {
  const style =
    padding === 0
      ? {
          paddingLeft: padding,
          paddingRight: padding,
          paddingTop: padding,
          paddingBottom: padding,
          height: "100%",
        }
      : {
          paddingTop: padding,
          paddingBottom: padding,
          height: "100%",
        }

  return (
    <Card
      className={styles["card"]}
      bodyStyle={style}
      title={<Typography.Text type="secondary">{title}</Typography.Text>}
      extra={
        <Tooltip title={helpText} placement="topRight">
          <InfoCircleOutlined />
        </Tooltip>
      }
    >
      {content}
    </Card>
  )
}

export default WidgetCard
