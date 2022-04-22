import {
  CameraOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import { Helmet } from "react-helmet"
import CreateCameraForm from "../../../../components/CreateCameraForm"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
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
      <PlusCircleOutlined />
      <span>New</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityCameraNewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New camera - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>Register a new camera</Typography.Title>

      <CreateCameraForm />
    </>
  )
}

export default EntityCameraNewPage
