import {
  ControlOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Typography } from "antd"
import { Helmet } from "react-helmet"
import CreateDriverForm from "../../../../components/CreateDriverForm"
import { routes } from "../../../../routes/constant"

const PageBreadcrumb: React.FC = () => (
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
      <PlusCircleOutlined />
      <span>New</span>
    </Breadcrumb.Item>
  </Breadcrumb>
)

const EntityDriverNewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New driver - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb />

      <Typography.Title>Register a new driver</Typography.Title>

      <CreateDriverForm />
    </>
  )
}

export default EntityDriverNewPage
