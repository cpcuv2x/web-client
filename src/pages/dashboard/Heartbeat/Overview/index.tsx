import { AreaChartOutlined, HeartOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"
import { HeartbeatTableElement, MadeFromHeartbeatTableElement, Status } from "../../../../interfaces/Status"
import HeartbeatTableComponent from "../../../../components/StatusDashboard/HeartbeatDashboard"
import useCars from "../../../../hooks/useCars"
import useHeartbeatStatus from "../../../../hooks/socket/useHeartbeatStatus"
import { useEffect } from "react"

const DashboardHeartbeatOverviewPage: React.FC = () => {

  // Do not forget for loading and notfound
  const { cars, count } = useCars();
  let carsID:Map<string,number> = new Map();
  const carsDataTable:HeartbeatTableElement[] = [];

  cars.forEach((element, index) => {
    carsID.set(element.id, index)
    const temp = new MadeFromHeartbeatTableElement(element.id);
    carsDataTable.push(temp);
  });

  let heartbeatOfACar = useHeartbeatStatus();
  useEffect(() => {
    if(heartbeatOfACar){
      heartbeatOfACar.forEach((element) => {
        if(element){

          const index = carsID.get(element.id)!;
          carsDataTable[index].carStatus = element.status;

          const camera = element.Camera!;
          if(camera){
            carsDataTable[index].cameraDriver = camera[0].status;
            carsDataTable[index].cameraDoor = camera[1].status;
            carsDataTable[index].cameraSeatsFront = camera[2].status;
            carsDataTable[index].cameraSeatsBack = camera[3].status;
          }

          const module = element.Module!;
          if(module){
            if(module.length>0 && module[0].status!==undefined){
              carsDataTable[index].drowsinessModule = module[0].status;
              carsDataTable[index].accidentModule = module[1].status;
            }
          }
        }
      });
    }
  }, [heartbeatOfACar]);

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
      <HeartbeatTableComponent data = {carsDataTable}/>
    </>
  )
}
  
export default DashboardHeartbeatOverviewPage
  