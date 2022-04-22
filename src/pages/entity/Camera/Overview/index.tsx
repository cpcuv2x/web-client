import {
  CameraOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Button, Col, Row, Space, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import CamerasFiltersForm from "../../../../components/CamerasFiltersForm"
import CamerasTable from "../../../../components/CamerasTable"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <ControlOutlined />
      <span>Entity</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.ENTITY_CAMERA}>
      <CameraOutlined />
      <span>Cameras</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCameraOverviewPage: React.FC = () => {
  const navigate = useNavigate()
  function onClickRegister() {
    navigate(`${routes.ENTITY_CAMERA}/new/`)
  }

  return (
    <>
      <Helmet>
        <title>Cameras - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>
        <Row justify="space-between">
          <Col>Cameras Management</Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={onClickRegister}
            >
              Register a new camera
            </Button>
          </Col>
        </Row>
      </Typography.Title>

      <Space direction="vertical" style={{ width: "100%" }}>
        <CamerasFiltersForm />
        <CamerasTable />
      </Space>
    </>
  )
}

export default EntityCameraOverviewPage
