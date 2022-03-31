import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes/constant"

interface Props {
  driverId: string
}

const EditDriverButton: React.FC<Props> = ({ driverId }: Props) => {
  const navigate = useNavigate()

  function onEdit(driverId: string) {
    navigate(`${routes.ENTITY_DRIVER}/edit/${driverId}`)
  }

  return (
    <Button
      icon={<EditOutlined />}
      onClick={() => {
        onEdit(driverId)
      }}
    />
  )
}

export default EditDriverButton
