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
import useCarFilters from "../../hooks/useCarFilters"

const { Option } = Select

const CarsFilter: React.FC = () => {
  const {
    clearFilter,
    clearAllFilters,
    filters,
    filtersObject,
    searchParams,
    setSearchParams,
  } = useCarFilters()

  const [form] = Form.useForm()

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
        <Form labelCol={{ span: 8 }} form={form} onFinish={onSearch}>
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
        {Object.entries(filtersObject).map(([key, value]) => (
          <Tag
            key={key}
            color="blue"
            closable
            closeIcon={<CloseCircleOutlined />}
            onClose={() => clearFilter(key)}
            style={{ padding: 4 }}
          >
            {key} = {value}
          </Tag>
        ))}
      </Space>
    </Space>
  )
}

export default CarsFilter
