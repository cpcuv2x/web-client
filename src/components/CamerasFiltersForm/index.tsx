import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { cameraPositionLabel, fieldLabel } from "../../constants/Camera"
import useCamerasFilters from "../../hooks/useCamerasFilters"
import useCars from "../../hooks/useCars"
import { CameraRole, CameraStatus } from "../../interfaces/Camera"

interface CamerasFiltersFormValues {
  id?: string
  name?: string
  description?: string
  // streamUrl?: string
  role?: CameraRole
  status?: CameraStatus
  carId?: string
}

const CamerasFiltersForm: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { clearAll } = useCamerasFilters()

  const [form] = Form.useForm<CamerasFiltersFormValues>()
  const { cars } = useCars()

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
          <Col span={4}>
            <Form.Item label={fieldLabel["id"]} name="id">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label={fieldLabel["name"]} name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label={fieldLabel["description"]} name="description">
              <Input />
            </Form.Item>
          </Col>
          {/* <Col span={4}>
            <Form.Item label={fieldLabel["streamUrl"]} name="streamUrl">
              <Input />
            </Form.Item>
          </Col> */}
          <Col span={4}>
            <Form.Item label={fieldLabel["role"]} name="role">
              <Select
                options={[
                  { label: "Not Selected", value: null },
                  ...[
                    CameraRole.DOOR,
                    CameraRole.DRIVER,
                    CameraRole.SEATS_FRONT,
                    CameraRole.SEATS_BACK,
                  ].map((role) => ({
                    label: cameraPositionLabel[role],
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
                  { label: "Active", value: CameraStatus.ACTIVE },
                  { label: "Inactive", value: CameraStatus.INACTIVE },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label={fieldLabel["carId"]} name="carId">
              <Select
                options={[
                  { label: "Not Selected", value: null },
                  ...cars.map(({ id, licensePlate }) => ({
                    label: `${licensePlate}  (${id})`,
                    value: id,
                  })),
                ]}
              />
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
