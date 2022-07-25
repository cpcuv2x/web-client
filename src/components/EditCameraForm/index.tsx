import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Select, Space } from "antd"
import { useNavigate } from "react-router-dom"
import { cameraPositionLabel, fieldLabel } from "../../constants/Camera"
import useCars from "../../hooks/useCars"
import { Camera, CameraRole } from "../../interfaces/Camera"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"

interface Props {
  initialValues: Camera
  mutate: VoidFunction
}

interface EditCameraFormValues {
  name: string
  description: string
  // streamUrl: string
  role: CameraRole
  carId: string
}

const EditCameraForm: React.FC<Props> = ({ initialValues, mutate }: Props) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { cars } = useCars()

  async function onSubmit(values: EditCameraFormValues) {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        role: values.role,
        carId: values.carId,
      }
      await axiosClient.patch(`/api/cameras/${initialValues.id}`, payload)
      await mutate()
      navigate(routes.ENTITY_CAMERA)
    } catch (error) {
      handleError(error)
    }
  }

  function onCancel() {
    if (form.isFieldsTouched()) {
      Modal.confirm({
        title: "Do you want to discard all changes?",
        onOk: () => {
          navigate(routes.ENTITY_CAMERA)
        },
      })
      return
    }
    navigate(routes.ENTITY_CAMERA)
  }

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label={fieldLabel["name"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={fieldLabel["description"]}
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        {/* <Form.Item
          name="streamUrl"
          label={fieldLabel["streamUrl"]}
          rules={[{ required: true }]}
        >
          <Input type="url" />
        </Form.Item> */}
        <Form.Item
          name="role"
          label={fieldLabel["role"]}
          rules={[{ required: true }]}
        >
          <Select
            options={[
              CameraRole.DOOR,
              CameraRole.DRIVER,
              CameraRole.SEATS_FRONT,
              CameraRole.SEATS_BACK,
            ].map((role) => ({
              label: cameraPositionLabel[role],
              value: role,
            }))}
          />
        </Form.Item>
        <Form.Item name="carId" label="Attached to vehicle">
          <Select
            options={[
              { label: "Not Selected", value: null },
              ...cars.map(({ id, licensePlate }) => ({
                label: `${licensePlate}  (${id})`,
                value: id,
              })),
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="default" onClick={onCancel} icon={<DeleteOutlined />}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditCameraForm
