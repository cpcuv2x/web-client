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
      const index = carsID.get(heartbeatOfACar?.carId as string) as number;
      const deviceStatus = heartbeatOfACar.deviceStatus;
      carsDataTable[index].carStatus = heartbeatOfACar?.carId !== undefined ? Status.ACTIVE : Status.INACTIVE;
      carsDataTable[index].cameraSeatsFront = deviceStatus?.cameraSeatsFront?.status as Status;
      carsDataTable[index].cameraSeatsBack = deviceStatus?.cameraSeatsBack?.status as Status;
      carsDataTable[index].cameraDriver = deviceStatus?.cameraDriver?.status as Status;
      carsDataTable[index].cameraDoor = deviceStatus?.cameraDoor?.status as Status;
      carsDataTable[index].accidentModule = deviceStatus?.accidentModule?.status as Status;
      carsDataTable[index].drowsinessModule = deviceStatus?.drowsinessModule?.status as Status;
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
  