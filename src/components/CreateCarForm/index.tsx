import { UploadOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, message, Modal, Space, Upload } from "antd"
import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import useCars from "../../hooks/useCars"
import axiosClient from "../../utils/axiosClient"

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

const CreateCarForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // FIXME: change offset and limit
  const { mutate } = useCars({}, 100, 0)

  const onCreate = async (values: any) => {
    const { licensePlate, model, image } = values
    const formData = new FormData()
    formData.append("licensePlate", licensePlate)
    formData.append("model", model)
    if (image && image instanceof Array && image.length) {
      formData.append("image", image[0].originFileObj)
    }

    try {
      await axiosClient.post("/api/cars", formData)
      mutate()
      navigate("/entity/car")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data)
      } else {
        message.error("Could not create the new car now")
      }
    }
  }

  const onCancel = () => {
    Modal.confirm({
      title: "Do you want to discard all changes?",
      onOk: () => {
        navigate("/entity/car")
      },
    })
  }

  return (
    <Card>
      <Form
        form={form}
        onFinish={onCreate}
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
