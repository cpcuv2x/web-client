import { Button, Card, Form, Input, Modal, Select, Space } from "antd"
import { useNavigate } from "react-router-dom"
import useCameras from "../../hooks/useCameras"
import useCars from "../../hooks/useCars"
import { CameraRole } from "../../interfaces/Camera"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"

const { Option } = Select

interface CreateCameraFormValues {
  name: string
  description: string
  streamUrl: string
  role: CameraRole
  carId: string
}

const CreateCameraForm: React.FC = () => {
  const [form] = Form.useForm<CreateCameraFormValues>()
  const navigate = useNavigate()
  const { mutate } = useCameras()
  const { cars } = useCars()

  async function onSubmit(values: CreateCameraFormValues) {
    const { carId, ...rest } = values
    const payload = carId !== "" ? values : rest
    try {
      await axiosClient.post("/api/cameras", payload)
      mutate()
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
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="streamUrl"
          label="Stream URL"
          rules={[{ required: true }]}
        >
          <Input type="url" />
        </Form.Item>
        <Form.Item name="role" label="Position" rules={[{ required: true }]}>
          <Select>
            <Option value={CameraRole.DOOR}>Entrance Door</Option>
            <Option value={CameraRole.DRIVER}>Driver Face</Option>
            <Option value={CameraRole.SEATS_FRONT}>Front</Option>
            <Option value={CameraRole.SEATS_BACK}>Back</Option>
          </Select>
        </Form.Item>
        <Form.Item name="carId" label="Attached to car">
          <Select>
            <Option value="">Not set</Option>
            {cars.map((car) => (
              <Option key={car.id} value={car.id}>
                {car.id} | {car.licensePlate}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateCameraForm
