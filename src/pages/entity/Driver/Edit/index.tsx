import { ControlOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditDriverForm from "../../../../components/EditDriverForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useDriver from "../../../../hooks/useDriver"
import { routes } from "../../../../routes/constant"

const EntityDriverEditPage: React.FC = () => {
  const { driverId } = useParams()
  if (!driverId) return <div>Loading...</div>

  const { driver, mutate, loading, error } = useDriver(driverId)

  if (loading) return <div>Loading...</div>

  if (error || !driver) return <div>An error occurred.</div>

  const driverFullName = `${driver.firstNameEN} ${driver.lastNameEN}`
  return (
    <>
      <Helmet>
        <title>Edit Driver: {driverFullName} - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          {
            label: "Driver",
            icon: <UserOutlined />,
            href: routes.ENTITY_DRIVER,
          },
          { label: "Edit", icon: <EditOutlined /> },
          { label: driverFullName },
        ]}
      />

      <Typography.Title>Edit Driver: {driverFullName}</Typography.Title>

      <EditDriverForm initialValues={driver} mutate={mutate} />
    </>
  )
}

export default EntityDriverEditPage
