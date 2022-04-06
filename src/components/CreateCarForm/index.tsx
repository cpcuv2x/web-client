import { UploadOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Space, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { useNavigate } from "react-router-dom"
import useCars from "../../hooks/useCars"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"
import { normFile } from "../../utils/normFile"

interface CreateCarFormValues {
  licensePlate: string
  model: string
  image: UploadFile[]
}

const CreateCarForm: React.FC = () => {
  const [form] = Form.useForm<CreateCarFormValues>()
  const navigate = useNavigate()
  const { mutate } = useCars()

  async function onSubmit(values: CreateCarFormValues) {
    const formData = new FormData()
    formData.append("licensePlate", values.licensePlate)
    formData.append("model", values.model)
    if (values.image && values.image.length) {
      formData.append("image", values.image[0].originFileObj as Blob)
    }

    try {
      await axiosClient.post("/api/cars", formData)
      mutate()
      navigate(routes.ENTITY_CAR)
    } catch (error) {
      handleError(error)
    }
  }

  function onCancel() {
    Modal.confirm({
      title: "Do you want to discard all changes?",
      onOk: () => {
        navigate(routes.ENTITY_CAR)
      },
    })
  }

  return (
    <Card>
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 4 }}
      >
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

export default CreateCarForm
