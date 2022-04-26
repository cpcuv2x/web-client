import {
  CameraOutlined,
  ControlOutlined,
  EditOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditCameraForm from "../../../../components/EditCameraForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useCamera from "../../../../hooks/useCamera"
import { routes } from "../../../../routes/constant"

const EntityCameraEditPage: React.FC = () => {
  const { cameraId } = useParams()
  if (!cameraId) return <div>Loading...</div>

  const { camera, mutate, loading, error } = useCamera(cameraId)

  if (loading) return <div>Loading...</div>

  if (error || !camera) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>Edit Camera: {camera.name} - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          {
            label: "Camera",
            icon: <CameraOutlined />,
            href: routes.ENTITY_CAMERA,
          },
          { label: "Edit", icon: <EditOutlined /> },
          { label: camera.name },
        ]}
      />

      <Typography.Title>Edit Camera: {camera.name}</Typography.Title>

      <EditCameraForm initialValues={camera} mutate={mutate} />
    </>
  )
}

export default EntityCameraEditPage
