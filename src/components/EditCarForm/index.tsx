import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Select, Space, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { useNavigate } from "react-router-dom"
import appConfig from "../../configuration"
import { fieldLabel } from "../../constants/Car"
import useCameras from "../../hooks/useCameras"
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
  cameras: string[]
}

const EditCarForm: React.FC<Props> = ({ initialValues, mutate }) => {
  const formInitialValues = {
    ...initialValues,
    cameras: initialValues.Camera.map(({ id }) => id),
  }

  const [form] = Form.useForm<EditCarFormValues>()
  const navigate = useNavigate()
  const { cameras } = useCameras()

  async function onSubmit(values: EditCarFormValues) {
    try {
      // Update the car
      const oldCameraIds = new Set(formInitialValues.cameras)
      const newCameraIds = new Set(values.cameras)
      const connectedCameraIds = Array.from(newCameraIds)
        .filter((item) => !oldCameraIds.has(item))
        .map((id) => ({ id }))
      const disconnectedCameraIds = Array.from(oldCameraIds)
        .filter((item) => !newCameraIds.has(item))
        .map((id) => ({ id }))

      const payload = {
        licensePlate: values.licensePlate,
        model: values.model,
        cameras: {
          connect: connectedCameraIds,
          disconnect: disconnectedCameraIds,
        },
      }
      await axiosClient.patch(`/api/cars/${formInitialValues.id}`, payload)

      // Update image
      if (form.isFieldTouched("image")) {
        if (values.image.length) {
          const formData = new FormData()
          formData.append("image", values.image[0].originFileObj as Blob)
          await axiosClient.patch(
            `/api/cars/${formInitialValues.id}/image`,
            formData
          )
        } else {
          await axiosClient.delete(`/api/cars/${formInitialValues.id}/image`)
        }
      }
      await mutate()
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
        layout="vertical"
        initialValues={formInitialValues}
      >
        <Form.Item
          name="image"
          label={fieldLabel["image"]}
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
              formInitialValues.imageFilename
                ? [
                    {
                      uid: "1",
                      name: formInitialValues.imageFilename,
                      url: `${appConfig.webServicesURL}api/cars/${formInitialValues.id}/image`,
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
          label={fieldLabel["licensePlate"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="model"
          label={fieldLabel["model"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="cameras" label={fieldLabel["cameras"]}>
          <Select
            mode="multiple"
            placeholder="Not selected"
            options={cameras.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
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

export default EditCarForm
