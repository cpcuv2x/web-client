import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal, Typography } from "antd"
import React from "react"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"

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
        try {
          await axiosClient.delete(`/api/drivers/${driverId}`)
          if (onFinished) onFinished()
        } catch (error) {
          handleError(error, "Could not delete this driver now")
        }
      },
    })
  }
  return <Button icon={<DeleteOutlined />} onClick={() => onDelete(driverId)} />
}

export default DeleteDriverButton
