import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Form, Input, Row, Space } from "antd"
import React from "react"
import { useSearchParams } from "react-router-dom"
import useDriversFilters from "../../hooks/useDriversFilters"

interface DriversFiltersFormValues {
  firstName?: string
  lastName?: string
  nationalID?: string
  carDrivingLicenseId?: string
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
            <Col span={8}>
              <Form.Item label="First Name" name="firstName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name" name="lastName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="National ID" name="nationalId">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Car Driving License No."
                name="carDrivingLicenseId"
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
