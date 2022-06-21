import { AreaChartOutlined, HeartOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"
import HeartbeatTableComponent from "../../../../components/StatusDashboard/HeartbeatDashboard"
import useHeartbeatStatus from "../../../../hooks/socket/useHeartbeatStatus"
import { useEffect, useState } from "react"

const DashboardHeartbeatOverviewPage: React.FC = () => {

  const [ lastUpdate, setLastUpdate ] = useState<string>(new Date().toLocaleString());
  const heartbeatData = useHeartbeatStatus();
  console.log(heartbeatData);

  useEffect(() => {
    if(heartbeatData) setLastUpdate(new Date().toLocaleString());
  }, [heartbeatData]);

  return (
    <>
      <Helmet>
        <title>Heartbeat - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Heartbeat",
            icon: <HeartOutlined />,
            href: routes.DASHBOARD_HEARTBEAT,
          },
        ]}
      />

      <Typography.Title>Heartbeat of vehicles and devices Dashboard</Typography.Title>
      <HeartbeatTableComponent data = {heartbeatData!} lastUpdate = {lastUpdate}/>
    </>
  )
}
  
export default DashboardHeartbeatOverviewPage
  