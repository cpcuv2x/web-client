import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal, Typography } from "antd"
import React from "react"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"

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
        try {
          await axiosClient.delete(`/api/cars/${carId}`)
          if (onFinished) onFinished()
        } catch (error) {
          handleError(error, "Could not delete this car now")
        }
      },
    })
  }
  return <Button icon={<DeleteOutlined />} onClick={() => onDelete(carId)} />
}

export default DeleteCarButton
