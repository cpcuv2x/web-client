import {
  CarOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Button, Col, Row, Space, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import CarsFiltersForm from "../../../../components/CarsFiltersForm"
import CarsTable from "../../../../components/CarsTable"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"

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

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          { label: "Car", icon: <CarOutlined />, href: routes.ENTITY_CAR },
        ]}
      />

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

      <Space direction="vertical" style={{ width: "100%" }}>
        <CarsFiltersForm />
        <CarsTable />
      </Space>
    </>
  )
}

export default EntityCarOverviewPage
