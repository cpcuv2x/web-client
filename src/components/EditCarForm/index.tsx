import { UploadOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Space, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { useNavigate } from "react-router-dom"
import appConfig from "../../configuration"
import useCars from "../../hooks/useCars"
import { Car } from "../../interfaces/Car"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"
import { normFile } from "../../utils/normFile"

interface Props {
  initialValues: Car
  mutate: VoidFunction
}

interface EditCarFormValues {
  licensePlate: string
  model: string
  image: UploadFile[]
}

// TODO: add camera edit
const EditCarForm: React.FC<Props> = ({ initialValues, mutate }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { mutate: mutateCars } = useCars()

  async function onSubmit(values: EditCarFormValues) {
    const { image, ...rest } = values

    try {
      // Update the car
      await axiosClient.patch(`/api/cars/${initialValues.id}`, rest)
      if (form.isFieldTouched("image")) {
        if (image.length) {
          const formData = new FormData()
          formData.append("image", image[0].originFileObj as Blob)
          await axiosClient.patch(
            `/api/cars/${initialValues.id}/image`,
            formData
          )
        } else {
          await axiosClient.delete(`/api/cars/${initialValues.id}/image`)
        }
      }
      mutate()
      mutateCars()
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
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 4 }}
        initialValues={initialValues}
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
            defaultFileList={
              initialValues.imageFilename
                ? [
                    {
                      uid: "1",
                      name: initialValues.imageFilename,
                      url: `${appConfig.webServicesURL}api/cars/${initialValues.id}/image`,
                    },
                  ]
                : []
            }
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
              Confirm
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditCarForm
