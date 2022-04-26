import {
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Select, Space, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { useNavigate } from "react-router-dom"
import useCameras from "../../hooks/useCameras"
import useCars from "../../hooks/useCars"
import { Car } from "../../interfaces/Car"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"
import { normFile } from "../../utils/normFile"

const { Option } = Select
interface CreateCarFormValues {
  licensePlate: string
  model: string
  image: UploadFile[]
  cameras: string[]
}

const CreateCarForm: React.FC = () => {
  const [form] = Form.useForm<CreateCarFormValues>()
  const navigate = useNavigate()
  const { mutate: mutateCars } = useCars()
  const { cameras, mutate: mutateCameras } = useCameras()

  async function onSubmit(values: CreateCarFormValues) {
    try {
      // Create a new car
      const payload = {
        licensePlate: values.licensePlate,
        model: values.model,
        cameras: values.cameras
          ? values.cameras.map((id) => ({
              id,
            }))
          : [],
      }
      const response = await axiosClient.post<Car>("/api/cars", payload)

      // Upload an image if exists
      if (values.image && values.image.length) {
        const newCarId = response.data.id
        const formData = new FormData()
        formData.append("image", values.image[0].originFileObj as Blob)
        await axiosClient.patch(`/api/cars/${newCarId}/image`, formData)
      }

      mutateCars()
      mutateCameras()
      navigate(routes.ENTITY_CAR)
    } catch (error) {
      handleError(error)
    }
  }

  function onCancel() {
    if (form.isFieldsTouched()) {
      Modal.confirm({
        title: "Do you want to discard all changes?",
        onOk: () => {
          navigate(routes.ENTITY_CAR)
        },
      })
      return
    }
    navigate(routes.ENTITY_CAR)
  }

  return (
    <Card>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="image"
            beforeUpload={() => false}
            listType="picture"
            accept="image/png, image/jpeg"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="licensePlate"
          label="License Plate"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="model" label="Model" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="cameras" label="Cameras">
          <Select
            mode="multiple"
            placeholder="Not selected"
            options={cameras.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
          >
            {cameras.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="default" onClick={onCancel} icon={<DeleteOutlined />}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
            >
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateCarForm
