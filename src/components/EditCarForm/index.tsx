import { Button, Card, Form, Input, message, Modal, Space } from "antd"
import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import useCars from "../../hooks/useCars"
import { Car } from "../../interfaces/Car"
import { routes } from "../../routes/constant"

interface Props {
  initialValues: Car
}

const EditCarForm: React.FC<Props> = ({ initialValues }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // FIXME: change offset and limit
  const { mutate } = useCars({}, 100, 0)

  const onEdit = async (values: any) => {
    const { licensePlate, model } = values
    const formData = new FormData()
    formData.append("licensePlate", licensePlate)
    formData.append("model", model)

    try {
      await axios.patch(`/api/cars/${initialValues.id}`, formData)
      mutate()
      navigate(routes.ENTITY_CAR)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data)
      } else {
        message.error("Could not edit the new car now")
      }
    }
  }

  const onCancel = () => {
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
        onFinish={onEdit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 4 }}
        initialValues={initialValues}
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

export default EditCarForm
