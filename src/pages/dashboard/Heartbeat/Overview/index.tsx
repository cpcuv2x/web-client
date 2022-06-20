import { AreaChartOutlined, HeartOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"
import { HeartbeatTableElement } from "../../../../interfaces/Status"
import HeartbeatTableComponent from "../../../../components/StatusDashboard/HeartbeatDashboard"
import useHeartbeatStatus from "../../../../hooks/socket/useHeartbeatStatus"
import { useEffect, useState } from "react"

const DashboardHeartbeatOverviewPage: React.FC = () => {
  
  const [ heartbeatData, setHeartbeatData ] = useState<HeartbeatTableElement[]>([]);
  const [ lastUpdate, setLastUpdate ] = useState<string>(new Date().toLocaleString());
 
  let heartbeatOfCars = useHeartbeatStatus();

  useEffect(() => {
    if(heartbeatOfCars){

      const tempHeartbeatData:HeartbeatTableElement[] = [];

      setLastUpdate(new Date().toLocaleString());

      heartbeatOfCars.forEach((element) => {
        if(element){

          let heartbeat:HeartbeatTableElement = {
            id: element.id,
            carStatus: element.status,
            carTimestamp: element.timestamp
          }
          
          const camera = element.Camera!;
          if(camera && camera.length >= 4){
            const cameraStatus = {
              cameraDriver: camera[0].status,
              cameraDoor: camera[1].status,
              cameraSeatsFront: camera[2].status,
              cameraSeatsBack: camera[3].status,
              cameraTimestamp: camera[0].timestamp
            }
            heartbeat = { ...heartbeat, ...cameraStatus }
          }
          
          const module = element.Module!;
          if(module && module.length >= 2){
            const moduleStatus = {
              drowsinessModule : module[0].status,
              accidentModule : module[1].status,
              moduleTimestamp : module[0].timestamp
            }
            heartbeat = { ...heartbeat, ...moduleStatus }
          }

          tempHeartbeatData.push(heartbeat)
        }
      });

      setHeartbeatData(tempHeartbeatData);
    }
  }, [heartbeatOfCars]);

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
      <HeartbeatTableComponent data = {heartbeatData} lastUpdate = {lastUpdate}/>
    </>
  )
}
  
export default DashboardHeartbeatOverviewPage
  