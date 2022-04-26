import {
  ControlOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import CreateDriverForm from "../../../../components/CreateDriverForm"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"

const EntityDriverNewPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>New driver - Entity | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          { label: "Entity", icon: <ControlOutlined /> },
          {
            label: "Driver",
            icon: <UserOutlined />,
            href: routes.ENTITY_DRIVER,
          },
          { label: "New", icon: <PlusCircleOutlined /> },
        ]}
      />

      <Typography.Title>Register a new driver</Typography.Title>

      <CreateDriverForm />
    </>
  )
}

export default EntityDriverNewPage
