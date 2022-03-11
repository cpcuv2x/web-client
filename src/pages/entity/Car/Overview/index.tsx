import {
  CarOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Button, Col, Row, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import CarsFilter from "../../../../components/CarsFilter"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <ControlOutlined />
      <span>Entity</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.ENTITY_CAR}>
      <CarOutlined />
      <span>Cars</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCarOverviewPage: React.FC = () => {
  const navigate = useNavigate()
  const onClickRegister = () => {
    navigate(`${routes.ENTITY_CAR}/new/`)
  }
  return (
    <>
      <Helmet>
        <title>Cars - Entity | 5G-V2X</title>
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
              Register a new car
            </Button>
          </Col>
        </Row>
      </Typography.Title>

      <Typography.Title>Cars Management</Typography.Title>
      <div>Overview</div>
    </>
  )
}

export default EntityCarOverviewPage
