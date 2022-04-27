import { Tag } from "antd"
import React from "react"
import { CarStatus } from "../../interfaces/Car"

interface Props {
  status?: CarStatus
}

const CarStatusTag: React.FC<Props> = ({ status = CarStatus.INACTIVE }) => {
  const color = status === CarStatus.ACTIVE ? "success" : "red"
  const label = status === CarStatus.ACTIVE ? "Active" : "Inactive"

  return <Tag color={color}>{label}</Tag>
}

export default CarStatusTag
