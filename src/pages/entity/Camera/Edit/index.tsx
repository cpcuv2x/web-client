import {
  CameraOutlined,
  ControlOutlined,
  EditOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import EditCameraForm from "../../../../components/EditCameraForm"
import useCamera from "../../../../hooks/useCamera"
import { routes } from "../../../../routes/constant"

interface PageBreadcrumbProps {
  name: string
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  name,
}: PageBreadcrumbProps) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <ControlOutlined />
      <span>Entity</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item href={routes.ENTITY_CAMERA}>
      <CameraOutlined />
      <span>Camera</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <EditOutlined />
      <span>Edit</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>{name}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCameraEditPage: React.FC = () => {
  const { cameraId } = useParams()
  if (!cameraId) return <div>Loading...</div>

  const { camera, mutate, loading, error } = useCamera(cameraId)

  if (loading) return <div>Loading...</div>

  if (error || !camera) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>Edit Camera({camera.name}) - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb name={camera.name} />

      <Typography.Title>Edit Camera: {camera.name}</Typography.Title>

      <EditCameraForm initialValues={camera} mutate={mutate} />
    </>
  )
}

export default EntityCameraEditPage
