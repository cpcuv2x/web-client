import {
  AreaChartOutlined,
  ControlOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Col, Row, Typography } from "antd"
import { Helmet } from "react-helmet"
import { useNavigate, useParams } from "react-router-dom"
import CopyToClipboardButton from "../../../../components/CopyToClipboardButton"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import AccidentLogByDriverTable from "../../../../components/widgets/driver/AccidentLogByDriverTable"
import DriverECRChart from "../../../../components/widgets/driver/DriverECRChart"
import DriverImage from "../../../../components/widgets/driver/DriverImage"
import DriverInformation from "../../../../components/widgets/driver/DriverInformation"
import DrowsinessLogTable from "../../../../components/widgets/driver/DrowsinessLogTable"
import useDriver from "../../../../hooks/useDriver"
import { routes } from "../../../../routes/constant"

const DashboardDriverPage = () => {
  const { driverId } = useParams()
  const navigate = useNavigate()

  if (!driverId) return <div>Loading...</div>

  const { driver, loading, error } = useDriver(driverId)

  if (loading) return <div>Loading...</div>

  if (error || !driver) return <div>An error occurred.</div>

  return (
    <>
      <Helmet>
        <title>
          Driver: {driver.firstNameTH} {driver.lastNameTH} - Dashboard | 5G-V2X
        </title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Driver",
            icon: <UserOutlined />,
            href: routes.DASHBOARD_DRIVER,
          },
          {
            label: (
              <>
                {driverId} <CopyToClipboardButton text={driverId} />
              </>
            ),
          },
        ]}
      />

      <Typography.Title>
        <Row justify="space-between">
          <Col>
            Driver: {driver.firstNameTH} {driver.lastNameTH}
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<ControlOutlined />}
              onClick={() => {
                navigate(`${routes.ENTITY_DRIVER}?id=${driverId}`)
              }}
            >
              Manage driver
            </Button>
          </Col>
        </Row>
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={7}>
          <DriverImage driverId={driverId} />
        </Col>
        <Col span={17}>
          <DriverECRChart driverId={driverId} />
        </Col>
        <Col span={24}>
          <DriverInformation driverId={driverId} />
        </Col>
        <Col span={24}>
          <DrowsinessLogTable driverId={driverId} />
        </Col>
        <Col span={24}>
          <AccidentLogByDriverTable driverId={driverId} />
        </Col>
      </Row>
    </>
  )
}

export default DashboardDriverPage
