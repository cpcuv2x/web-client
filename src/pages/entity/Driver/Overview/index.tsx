import {
  ControlOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Button, Col, Row, Space, Typography } from "antd"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import DriversFilter from "../../../../components/DriversFilter"
import DriversTable from "../../../../components/DriversTable"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <ControlOutlined />
      <span>Entity</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.ENTITY_DRIVER}>
      <UserOutlined />
      <span>Drivers</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityDriverOverviewPage: React.FC = () => {
  const navigate = useNavigate()

  function onClickRegister() {
    navigate(`${routes.ENTITY_DRIVER}/new/`)
  }

  return (
    <>
      <Helmet>
        <title>Drivers - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>
        <Row justify="space-between">
          <Col>Cars Management</Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={onClickRegister}
            >
              Register a new driver
            </Button>
          </Col>
        </Row>
      </Typography.Title>

      <Space direction="vertical">
        <DriversFilter />
        <DriversTable />
      </Space>
    </>
  )
}

export default EntityDriverOverviewPage
