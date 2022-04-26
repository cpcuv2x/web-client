import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { driverGenderLabel, fieldLabel } from "../../constants/Driver"
import useDriversFilters from "../../hooks/useDriversFilters"
import { DriverGender, DriverStatus } from "../../interfaces/Driver"

interface DriversFiltersFormValues {
  id?: string
  firstNameTH?: string
  lastNameTH?: string
  firstNameEN?: string
  lastNameEN?: string
  gender?: DriverGender
  nationalId?: string
  carDrivingLicenseId?: string
  status?: DriverStatus
}

const DriversFiltersForm: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { clearAll } = useDriversFilters()

  const [form] = Form.useForm<DriversFiltersFormValues>()

  const onSubmit = (values: DriversFiltersFormValues) => {
    const newParams = new URLSearchParams(params)
    Object.entries(values).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        newParams.delete(key)
      } else {
        newParams.set(key, value as string)
      }
    })
    setParams(newParams)
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card>
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label={fieldLabel["id"]} name="id">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["firstNameTH"]} name="firstNameTH">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["lastNameTH"]} name="lastNameTH">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["firstNameEN"]} name="firstNameEN">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["lastNameEN"]} name="lastNameEN">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="gender" label={fieldLabel["gender"]}>
                <Select
                  options={[
                    { label: "Not Selected", value: null },
                    ...[
                      DriverGender.MALE,
                      DriverGender.FEMALE,
                      DriverGender.NOT_SPECIFIED,
                    ].map((role) => ({
                      label: driverGenderLabel[role],
                      value: role,
                    })),
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["status"]} name="status">
                <Select
                  options={[
                    { label: "Not selected", value: null },
                    { label: "Active", value: DriverStatus.ACTIVE },
                    { label: "Inactive", value: DriverStatus.INACTIVE },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="nationalId" label={fieldLabel["nationalId"]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="carDrivingLicenseId"
                label={fieldLabel["carDrivingLicenseId"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Space>
                <Button
                  icon={<DeleteOutlined />}
                  htmlType="reset"
                  onClick={clearAll}
                >
                  Clear
                </Button>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                >
                  Search
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </Space>
  )
}

export default DriversFiltersForm
