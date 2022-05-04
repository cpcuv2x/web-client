import { CheckSquareOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import React from "react"
import axiosClient from "../../../utils/axiosClient"

interface Props {
  notiId: string
  mutateNotifications: VoidFunction
}

const MarkAsReadIcon: React.FC<Props> = ({ notiId, mutateNotifications }) => {
  async function onClick() {
    try {
      await axiosClient.get(`/api/notifications/${notiId}/read`)
      await mutateNotifications()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Tooltip title="Mark as read">
      <CheckSquareOutlined onClick={onClick} />
    </Tooltip>
  )
}

export default MarkAsReadIcon
