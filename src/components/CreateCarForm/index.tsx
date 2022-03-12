import { Button, Card, Form, Input, Modal, Space } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"

const CreateCarForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onCreate = (values: any) => {
    console.log("values", values)
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
