import { CarOutlined, ControlOutlined, EditOutlined } from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC<{ carId: string }> = ({ carId }) => (
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
      <EditOutlined />
      <span>Edit</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>{carId}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCarEditPage: React.FC = () => {
  const { carId } = useParams()

  if (!carId) return <div>Loading...</div>

  return (
    <>
      <Helmet>
        <title>Edit Car({carId}) - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb carId={carId} />

      <Typography.Title>Edit Car: {carId}</Typography.Title>
      <div>Editing... {carId}</div>
    </>
  )
}

export default EntityCarEditPage
