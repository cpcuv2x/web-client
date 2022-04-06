import { ControlOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditDriverForm from "../../../../components/EditDriverForm"
import useDriver from "../../../../hooks/useDriver"
import { routes } from "../../../../routes/constant"

interface PageBreadcrumbProps {
  driverFullName: string
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ driverFullName }) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <ControlOutlined />
      <span>Entity</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.ENTITY_DRIVER}>
      <UserOutlined />
      <span>Driver</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <EditOutlined />
      <span>Edit</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>{driverFullName}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityDriverEditPage: React.FC = () => {
  const { driverId } = useParams()
  if (!driverId) return <div>Loading...</div>

  const { driver, mutate, loading, error } = useDriver(driverId)

  if (loading) return <div>Loading...</div>

  if (error || !driver) return <div>An error occurred.</div>

  const driverFullName = `${driver.firstName} ${driver.lastName}`
  return (
    <>
      <Helmet>
        <title>Edit Driver({driver.id}) - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb driverFullName={driverFullName} />

      <Typography.Title>Edit Driver: {driverFullName}</Typography.Title>

      <EditDriverForm initialValues={driver} mutate={mutate} />
    </>
  )
}

export default EntityDriverEditPage
