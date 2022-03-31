import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal, Typography } from "antd"
import React from "react"
import axiosClient from "../../utils/axiosClient"

interface Props {
  driverId: string
  onFinished?: VoidFunction
}

const DeleteDriverButton: React.FC<Props> = ({ driverId, onFinished }) => {
  const onDelete = (driverId: string) => {
    Modal.confirm({
      title: "Do you want to delete this driver?",
      content: (
        <span>
          id: <Typography.Text code>{driverId}</Typography.Text>
        </span>
      ),
      onOk: async () => {
        await axiosClient.delete(`/api/drivers/${driverId}`)
        if (onFinished) onFinished()
      },
    })
  }
  return <Button icon={<DeleteOutlined />} onClick={() => onDelete(driverId)} />
}

export default DeleteDriverButton
