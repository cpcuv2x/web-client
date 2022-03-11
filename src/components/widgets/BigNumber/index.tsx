import React from "react"
import styles from "./styles.module.less"
import WidgetCard from "../WidgetCard"

interface Props {
  value: React.ReactNode
  title: React.ReactNode
  helpText: React.ReactNode
}

const BigNumber: React.FC<Props> = ({ value, title, helpText }) => {
  return (
    <WidgetCard
      title={title}
      helpText={helpText}
      content={<span className={styles["value"]}>{value}</span>}
    />
  )
}

export default BigNumber
