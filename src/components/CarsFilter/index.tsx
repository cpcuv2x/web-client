import {
  CloseCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons"
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
  Tag,
} from "antd"
import React from "react"
import { useSearchParams } from "react-router-dom"

const { Option } = Select

const CarsFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [form] = Form.useForm()

  const filters = [
    { label: "License Plate", key: "licensePlate" },
    { label: "Model", key: "model" },
    { label: "Image file name", key: "imageFilename" },
    { label: "Status", key: "status" },
    { label: "Minimum Passengers", key: "minPassengers" },
    { label: "Maximum Passengers", key: "maxPassengers" },
  ]

  const filtersObject: Record<string, string> = filters.reduce(
    (previous, { key }) => {
      const filterValue = searchParams.get(key)
      if (filterValue)
        return {
          [key]: filterValue,
          ...previous,
        }
      else return previous
    },
    {}
  )

  const clearFilter = (key: string) => {
    const params = searchParams
    params.delete(key)
    setSearchParams(params)
  }

  const clearAllFilters = () => {
    const params = searchParams
    Object.keys(filtersObject).forEach((key) => {
      params.delete(key)
    })
    setSearchParams(params)
  }

  const onSearch = (values: any) => {
    const params = searchParams
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value as string)
        return
      }

      params.delete(key)
    })
    setSearchParams(params)
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card>
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row gutter={8}>
            {filters.map(({ key, label }) => {
              let input
              switch (key) {
                case "minPassengers":
                  input = <InputNumber style={{ width: "100%" }} />
                  break
                case "maxPassengers":
                  input = <InputNumber style={{ width: "100%" }} />
                  break
                case "status":
                  input = (
                    <Select placeholder="Not selected">
                      <Option value={null}>Not selected</Option>
                      <Option value="ACTIVE">Active</Option>
                      <Option value="INACTIVE">Inactive</Option>
                    </Select>
                  )
                  break
                default:
                  input = <Input />
              }
              return (
                <Col span={8} key={key}>
                  <Form.Item label={label} name={key}>
                    {input}
                  </Form.Item>
                </Col>
              )
            })}
          </Row>
          <Row justify="end">
            <Col>
              <Space>
                <Button
                  icon={<DeleteOutlined />}
                  htmlType="reset"
                  onClick={clearAllFilters}
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
      <Space size="small">
        {Object.keys(filtersObject).map((key) => (
          <Tag
            key={key}
            color="blue"
            closable
            closeIcon={<CloseCircleOutlined />}
            onClose={() => clearFilter(key)}
            style={{ padding: 4 }}
          >
            {key} = {filtersObject[key]}
          </Tag>
        ))}
      </Space>
    </Space>
  )
}

export default CarsFilter
