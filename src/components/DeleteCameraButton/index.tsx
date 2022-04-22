import { DeleteOutlined } from "@ant-design/icons"
import { Button, Modal, Typography } from "antd"
import useCameras from "../../hooks/useCameras"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"

interface Props {
  cameraId: string
}

const DeleteCameraButton: React.FC<Props> = ({ cameraId }: Props) => {
  const { mutate } = useCameras()

  function onDelete(cameraId: string) {
    Modal.confirm({
      title: "Do you want to delete this camera?",
      content: (
        <span>
          id: <Typography.Text code>{cameraId}</Typography.Text>
        </span>
      ),
      onOk: async () => {
        try {
          await axiosClient.delete(`/api/cameras/${cameraId}`)
          mutate()
        } catch (error) {
          handleError(error)
        }
      },
    })
  }

  return <Button icon={<DeleteOutlined />} onClick={() => onDelete(cameraId)} />
}

export default DeleteCameraButton
