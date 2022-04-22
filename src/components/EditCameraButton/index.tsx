import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes/constant"

interface Props {
  cameraId: string
}

const EditCameraButton: React.FC<Props> = ({ cameraId }) => {
  const navigate = useNavigate()
  const onEdit = (cameraId: string) => {
    navigate(`${routes.ENTITY_CAMERA}/edit/${cameraId}`)
  }
  return <Button icon={<EditOutlined />} onClick={() => onEdit(cameraId)} />
}

export default EditCameraButton
