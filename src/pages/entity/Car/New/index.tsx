import {
  CarOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import CreateCarForm from "../../../../components/CreateCarForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"

const EntityCarNewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New car - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          { label: "Car", icon: <CarOutlined />, href: routes.ENTITY_CAR },
          { label: "New", icon: <PlusCircleOutlined /> },
        ]}
      />

      <Typography.Title>Register a new car</Typography.Title>

      <CreateCarForm />
    </>
  )
}

export default EntityCarNewPage
