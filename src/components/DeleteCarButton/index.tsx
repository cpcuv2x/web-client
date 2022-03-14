import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal, Typography } from "antd"
import axios from "axios"
import React from "react"

interface Props {
  carId: string
  onFinished?: VoidFunction
}

const DeleteCarButton: React.FC<Props> = ({ carId, onFinished }) => {
  const onDelete = (carId: string) => {
    Modal.confirm({
      title: "Do you want to delete this car?",
      content: (
        <span>
          id: <Typography.Text code>{carId}</Typography.Text>
        </span>
      ),
      onOk: async () => {
        await axios.delete(`/api/cars/${carId}`)
        if (onFinished) onFinished()
      },
    })
  }
  return <Button icon={<DeleteOutlined />} onClick={() => onDelete(carId)} />
}

export default DeleteCarButton
