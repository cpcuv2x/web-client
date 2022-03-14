import {
  CarOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import CreateCarForm from "../../../../components/CreateCarForm"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <ControlOutlined />
      <span>Entity</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.ENTITY_CAR}>
      <CarOutlined />
      <span>Car</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <PlusCircleOutlined />
      <span>New</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCarNewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New car - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>Register a new car</Typography.Title>

      <CreateCarForm />
    </>
  )
}

export default EntityCarNewPage
