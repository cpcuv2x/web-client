import { UploadOutlined } from "@ant-design/icons"
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Upload,
} from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import moment, { Moment } from "moment"
import { useNavigate } from "react-router-dom"
import useDrivers from "../../hooks/useDrivers"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"
import { normFile } from "../../utils/normFile"
import { isThaiNationalID } from "../../utils/validators/ThaiNationalID"

interface CreateDriverFormValues {
  firstName: string
  lastName: string
  birthDate: Moment
  nationalID: string
  drivingLicenseNo: string
  image: UploadFile[]
}

const CreateDriverForm = () => {
  const [form] = Form.useForm<CreateDriverFormValues>()
  const navigate = useNavigate()
  const { mutate } = useDrivers()

  async function onSubmit(values: CreateDriverFormValues) {
    const formData = new FormData()
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("birthDate", values.birthDate.toISOString())
    formData.append("nationalId", values.nationalID)
    formData.append("carDrivingLicenseId", values.drivingLicenseNo)
    formData.append("image", values.image[0].originFileObj as Blob)

    try {
      await axiosClient.post("/api/drivers", formData)
      mutate()
      navigate(routes.ENTITY_DRIVER)
    } catch (error) {
      handleError(error)
    }
  }

  const onCancel = () => {
    Modal.confirm({
      title: "Do you want to discard all changes?",
      onOk: () => {
        navigate(routes.ENTITY_DRIVER)
      },
    })
  }

  // TODO: add Username and Password fields

  return (
    <Card>
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
      >
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
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
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthDate"
          label="Birth Date"
          rules={[{ required: true }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            disabledDate={(date) => date > moment().subtract(18, "years")}
          />
        </Form.Item>

        <Form.Item
          name="nationalID"
          label="National ID"
          rules={[
            { required: true },
            {
              message: "Invalid national ID",
              validator: (_, value) => {
                if (isThaiNationalID(value)) {
                  return Promise.resolve()
                }
                return Promise.reject()
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="drivingLicenseNo"
          label="Car Driving License No."
          rules={[
            { required: true },
            { message: "Invalid license ID", pattern: /^[0-9]*$/g },
          ]}
        >
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

export default CreateDriverForm
