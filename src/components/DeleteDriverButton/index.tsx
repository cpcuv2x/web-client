import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal, Typography } from "antd"
import axios from "axios"
import React from "react"

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
        await axios.delete(`/api/drivers/${driverId}`)
        if (onFinished) onFinished()
      },
    })
  }
  return <Button icon={<DeleteOutlined />} onClick={() => onDelete(driverId)} />
}

export default DeleteDriverButton
