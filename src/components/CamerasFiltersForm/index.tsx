import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd"
import React from "react"
import { useSearchParams } from "react-router-dom"
import useCamerasFilters from "../../hooks/useCamerasFilters"
import { CameraRole, CameraStatus } from "../../interfaces/Camera"

const { Option } = Select

interface CamerasFiltersFormValues {
  name?: string
  description?: string
  streamUrl?: string
  carId?: string
  status?: CameraStatus
}

const CamerasFiltersForm: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { clearAll } = useCamerasFilters()

  const [form] = Form.useForm<CamerasFiltersFormValues>()

  function onSubmit(values: CamerasFiltersFormValues) {
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
    <Card>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="ID" name="id">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Stream URL" name="streamUrl">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Position" name="role">
              <Select placeholder="Not selected">
                <Option value="">Not selected</Option>
                <Option value={CameraRole.DOOR}>Entrance Door</Option>
                <Option value={CameraRole.DRIVER}>Driver Face</Option>
                <Option value={CameraRole.SEATS_FRONT}>Front</Option>
                <Option value={CameraRole.SEATS_BACK}>Back</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Status" name="status">
              <Select placeholder="Not selected">
                <Option value="">Not selected</Option>
                <Option value={CameraStatus.ACTIVE}>Active</Option>
                <Option value={CameraStatus.INACTIVE}>Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Car ID" name="carId">
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
  )
}

export default CamerasFiltersForm
