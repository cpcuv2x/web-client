import { CarOutlined, ControlOutlined, EditOutlined } from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditCarForm from "../../../../components/EditCarForm"
import useCar from "../../../../hooks/useCar"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC<{ carLicensePlate: string }> = ({
  carLicensePlate,
}) => (
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
      <span>{carLicensePlate}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCarEditPage: React.FC = () => {
  const { carId } = useParams()
  if (!carId) return <div>Loading...</div>

  const { car, mutate, loading } = useCar(carId)
  if (loading) return <div>Loading...</div>

  return (
    <>
      <Helmet>
        <title>Edit Car({car.licensePlate}) - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb carLicensePlate={car.licensePlate} />

      <Typography.Title>Edit Car: {car.licensePlate}</Typography.Title>

      <EditCarForm initialValues={car} mutate={mutate} />
    </>
  )
}

export default EntityCarEditPage
