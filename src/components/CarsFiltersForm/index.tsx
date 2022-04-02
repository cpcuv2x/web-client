import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd"
import _ from "lodash"
import React from "react"
import { useSearchParams } from "react-router-dom"
import useCarsFilter from "../../hooks/useCarsFilters"
import { CarStatus } from "../../interfaces/Car"

const { Option } = Select

interface CarsFiltersFormValues {
  licensePlate?: string
  model?: string
  status?: CarStatus
  minPassengers?: number
  maxPassengers?: number
}

const CarsFiltersForm: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { clearAll } = useCarsFilter()

  const [form] = Form.useForm<CarsFiltersFormValues>()

  const onSubmit = (values: CarsFiltersFormValues) => {
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
              <Form.Item label="License Plate No." name="licensePlate">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Model" name="model">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Status" name="status">
                <Select placeholder="Not selected">
                  <Option value="">Not selected</Option>
                  <Option value="ACTIVE">Active</Option>
                  <Option value="INACTIVE">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Min. Passengers" name="minPassengers">
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Max. Passengers" name="maxPassengers">
                <InputNumber style={{ width: "100%" }} min={0} />
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

export default CarsFiltersForm
