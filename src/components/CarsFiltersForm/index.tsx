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
import React from "react"
import { useSearchParams } from "react-router-dom"
import { fieldLabel } from "../../constants/Car"
import useCarsFilters from "../../hooks/useCarsFilters"
import { CarStatus } from "../../interfaces/Car"

interface CarsFiltersFormValues {
  id?: string
  licensePlate?: string
  model?: string
  status?: CarStatus
  // minPassengers?: number
  // maxPassengers?: number
}

const CarsFiltersForm: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { clearAll } = useCarsFilters()

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
            <Col span={4}>
              <Form.Item label={fieldLabel["id"]} name="id">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["licensePlate"]} name="licensePlate">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["model"]} name="model">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={fieldLabel["status"]} name="status">
                <Select
                  options={[
                    { label: "Not selected", value: null },
                    { label: "Active", value: CarStatus.ACTIVE },
                    { label: "Inactive", value: CarStatus.INACTIVE },
                  ]}
                />
              </Form.Item>
            </Col>
            {/* <Col span={4}>
              <Form.Item
                label={fieldLabel["minPassengers"]}
                name="minPassengers"
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label={fieldLabel["maxPassengers"]}
                name="maxPassengers"
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col> */}
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
