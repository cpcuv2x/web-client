import {
  CameraOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import CreateCameraForm from "../../../../components/CreateCameraForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"

const EntityCameraNewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New camera - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          {
            label: "Camera",
            icon: <CameraOutlined />,
            href: routes.ENTITY_CAMERA,
          },
          { label: "New", icon: <PlusCircleOutlined /> },
        ]}
      />

      <Typography.Title>Register a new camera</Typography.Title>

      <CreateCameraForm />
    </>
  )
}

export default EntityCameraNewPage
