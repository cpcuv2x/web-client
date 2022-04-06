import { UploadOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Space, Upload } from "antd"
import { UploadFile } from "antd/lib/upload/interface"
import { Moment } from "moment"
import { useNavigate } from "react-router-dom"
import appConfig from "../../configuration"
import useDrivers from "../../hooks/useDrivers"
import { Driver } from "../../interfaces/Driver"
import { routes } from "../../routes/constant"
import axiosClient from "../../utils/axiosClient"
import handleError from "../../utils/handleError"
import { normFile } from "../../utils/normFile"
import { isThaiNationalID } from "../../utils/validators/ThaiNationalID"

interface Props {
  initialValues: Driver
  mutate: VoidFunction
}

interface EditDriverFormValues {
  firstName: string
  lastName: string
  birthDate: Moment
  nationalId: string
  carDrivingLicenseId: string
  image: UploadFile[]
}

const EditDriverForm: React.FC<Props> = ({ initialValues, mutate }: Props) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { mutate: mutateDrivers } = useDrivers()

  async function onSubmit(values: EditDriverFormValues) {
    console.log("values", values)
    const formData = new FormData()
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    // FIXME: use value from input instead
    formData.append("birthDate", initialValues.birthDate)
    formData.append("nationalId", values.nationalId)
    formData.append("carDrivingLicenseId", values.carDrivingLicenseId)
    if (values.image && values.image.length) {
      formData.append("image", values.image[0].originFileObj as Blob)
    }

    try {
      await axiosClient.patch(`/api/drivers/${initialValues.id}`, formData)
      mutate()
      mutateDrivers()
      navigate(routes.ENTITY_DRIVER)
    } catch (error) {
      handleError(error)
    }
  }

  function onCancel() {
    Modal.confirm({
      title: "Do you want to discard all changes?",
      onOk: () => {
        navigate(routes.ENTITY_DRIVER)
      },
    })
  }

  //   FIXME: enable birth date input

  return (
    <Card>
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
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
                      url: `${appConfig.webServicesURL}api/drivers/images/${initialValues.imageFilename}`,
                    },
                  ]
                : []
            }
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

        {/* <Form.Item
          name="birthDate"
          label="Birth Date"
          rules={[{ required: true }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            disabledDate={(date) => date > moment().subtract(18, "years")}
          />
        </Form.Item> */}

        <Form.Item
          name="nationalId"
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
          name="carDrivingLicenseId"
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

export default EditDriverForm
