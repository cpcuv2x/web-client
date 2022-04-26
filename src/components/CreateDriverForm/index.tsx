import {
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Upload,
} from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import moment, { Moment } from "moment"
import { useNavigate } from "react-router-dom"
import { driverGenderLabel, fieldLabel } from "../../constants/Driver"
import { Driver, DriverGender } from "../../interfaces/Driver"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"
import { normFile } from "../../utils/normFile"
import { isThaiNationalID } from "../../utils/validators/ThaiNationalID"

interface CreateDriverFormValues {
  firstNameTH: string
  lastNameTH: string
  firstNameEN: string
  lastNameEN: string
  gender: DriverGender
  birthDate: Moment
  nationalId: string
  carDrivingLicenseId: string
  image: UploadFile[]
  username: string
  password: string
}

const CreateDriverForm = () => {
  const [form] = Form.useForm<CreateDriverFormValues>()
  const navigate = useNavigate()

  async function onSubmit(values: CreateDriverFormValues) {
    try {
      // Create a new driver
      const payload = {
        firstNameTH: values.firstNameTH,
        lastNameTH: values.lastNameTH,
        firstNameEN: values.firstNameEN,
        lastNameEN: values.lastNameEN,
        gender: values.gender,
        birthDate: values.birthDate.toISOString(),
        nationalId: values.nationalId,
        carDrivingLicenseId: values.carDrivingLicenseId,
        username: values.username,
        password: values.password,
      }

      const response = await axiosClient.post<Driver>("/api/drivers", payload)

      // Upload an image
      const newDriverId = response.data.id
      const formData = new FormData()
      formData.append("image", values.image[0].originFileObj as Blob)
      await axiosClient.patch(`/api/drivers/${newDriverId}/image`, formData)

      navigate(routes.ENTITY_DRIVER)
    } catch (error) {
      handleError(error)
    }
  }

  function onCancel() {
    if (form.isFieldsTouched()) {
      Modal.confirm({
        title: "Do you want to discard all changes?",
        onOk: () => {
          navigate(routes.ENTITY_DRIVER)
        },
      })
      return
    }
    navigate(routes.ENTITY_DRIVER)
  }

  return (
    <Card>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="image"
          label={fieldLabel["image"]}
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
          name="firstNameTH"
          label={fieldLabel["firstNameTH"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastNameTH"
          label={fieldLabel["lastNameTH"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstNameEN"
          label={fieldLabel["firstNameEN"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastNameEN"
          label={fieldLabel["lastNameEN"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label={fieldLabel["gender"]}
          rules={[{ required: true }]}
        >
          <Select
            options={[
              DriverGender.MALE,
              DriverGender.FEMALE,
              DriverGender.NOT_SPECIFIED,
            ].map((role) => ({
              label: driverGenderLabel[role],
              value: role,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="birthDate"
          label={fieldLabel["birthDate"]}
          rules={[{ required: true }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            disabledDate={(date) => date > moment().subtract(18, "years")}
          />
        </Form.Item>

        <Form.Item
          name="nationalId"
          label={fieldLabel["nationalId"]}
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
          name="carDrivingLicenseId"
          label={fieldLabel["carDrivingLicenseId"]}
          rules={[
            { required: true },
            { message: "Invalid license ID", pattern: /^[0-9]*$/g },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label={fieldLabel["username"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label={fieldLabel["password"]}
          rules={[{ required: true }]}
        >
          <Input.Password />
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

export default CreateDriverForm
