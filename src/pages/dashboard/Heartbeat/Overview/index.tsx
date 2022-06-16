import { AreaChartOutlined, HeartOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"
import { HeartbeatTableElement, Status } from "../../../../interfaces/Status"
import HeartbeatTableComponent from "../../../../components/StatusDashboard/HeartbeatDashboard"

const DashboardHeartbeatOverviewPage: React.FC = () => {

  // Do not forget for loading and notfound
  /*Mock up data part*/  
  var mockUpData : any[] = [];
  const trueOrFalse : Status[] = [Status.ACTIVE, Status.INACTIVE];
  const binaryRandom = () => {
      return trueOrFalse[Math.floor(Math.random() * trueOrFalse.length)]
  }

  for(var i=0; i<30; i++){
      const data : HeartbeatTableElement = {
          "id":"AB"+i.toString(),
          "carStatus": binaryRandom(),
          "fontCamStatus": binaryRandom(),
          "backCamStatus": binaryRandom(),
          "doorCamStatus": binaryRandom(),
          "driverCamStatus": binaryRandom(),
          "drowsinessModuleStatus": binaryRandom(),
          "accidentModuleStatus": binaryRandom(),
      }
      mockUpData.push(data)
  }
  /**/

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
      <HeartbeatTableComponent data = {mockUpData}/>
    </>
  )
}
  
export default DashboardHeartbeatOverviewPage
  