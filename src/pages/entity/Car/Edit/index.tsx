import { CarOutlined, ControlOutlined, EditOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditCarForm from "../../../../components/EditCarForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useCar from "../../../../hooks/useCar"
import { routes } from "../../../../routes/constant"

const EntityCarEditPage: React.FC = () => {
  const { carId } = useParams()
  if (!carId) return <div>Loading...</div>

  const { car, loading, error, mutate } = useCar(carId)
  if (loading) return <div>Loading...</div>

  if (error || !car) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>Edit Vehicle: {car.id} | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          { label: "Car", icon: <CarOutlined />, href: routes.ENTITY_CAR },
          { label: "Edit", icon: <EditOutlined /> },
          { label: car.id },
        ]}
      />

      <Typography.Title>Edit car: {car.id}</Typography.Title>

      <EditCarForm initialValues={car} mutate={mutate} />
    </>
  )
}

export default EntityCarEditPage
