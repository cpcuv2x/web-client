import { CarOutlined, ControlOutlined } from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
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
  return (
    <>
      <Helmet>
        <title>Cars - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>Cars Management</Typography.Title>
      <div>Overview</div>
    </>
  )
}

export default EntityCarOverviewPage
