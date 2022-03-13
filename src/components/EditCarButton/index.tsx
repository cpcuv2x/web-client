import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes/constant"

interface Props {
  carId: string
}

const EditCarButton: React.FC<Props> = ({ carId }) => {
  const navigate = useNavigate()
  const onEdit = (carId: string) => {
    navigate(`${routes.ENTITY_CAR}/edit/${carId}`)
  }
  return <Button icon={<EditOutlined />} onClick={() => onEdit(carId)} />
}

export default EditCarButton
