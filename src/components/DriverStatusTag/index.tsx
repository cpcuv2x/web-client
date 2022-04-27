import { Tag } from "antd"
import React from "react"
import { DriverStatus } from "../../interfaces/Driver"

interface Props {
  status?: DriverStatus
}

const DriverStatusTag: React.FC<Props> = ({
  status = DriverStatus.INACTIVE,
}) => {
  const color = status === DriverStatus.ACTIVE ? "success" : "red"
  const label = status === DriverStatus.ACTIVE ? "Active" : "Inactive"

  return <Tag color={color}>{label}</Tag>
}

export default DriverStatusTag
