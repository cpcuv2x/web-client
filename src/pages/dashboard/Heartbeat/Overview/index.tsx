import { ApiOutlined, AreaChartOutlined, HeartOutlined } from "@ant-design/icons"
import { Button, Col, Row, Table, Typography } from "antd"
import Column from "antd/lib/table/Column"
import ColumnGroup from "antd/lib/table/ColumnGroup"
import { Helmet } from "react-helmet"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import { routes } from "../../../../routes/constant"
import { HeartbeatTableElement, Status } from "../../../../interfaces/Status"
import StatusCircle from "../../../../components/StatusDashboard/StatusCircle"

const DashboardHeartbeatOverviewPage: React.FC = () => {


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

    const getStatusColumn = (title : string , keyAndIndex : string) => {
        return <Column title={title} dataIndex={keyAndIndex} key={keyAndIndex} align = "center"
                    render={(status) => (<StatusCircle status={status}/>)}
                    filters = {[
                        {
                            text: Status.ACTIVE,
                            value: Status.ACTIVE,
                        },
                        {
                            text: Status.INACTIVE,
                            value: Status.INACTIVE,
                        },
                    ]}
                    onFilter = {
                        (value, record:HeartbeatTableElement) => record[keyAndIndex as keyof HeartbeatTableElement].indexOf(value.toString()) === 0
                    }

                />
    }
  
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

        <Typography.Title>Heartbeat of cars and devices Dashboard</Typography.Title>
  
        <Table dataSource={mockUpData} bordered = {true} sticky = {true} size="small">
            <Column title="ID" dataIndex="id" key="id" align = "center"/>
            {getStatusColumn("Car status", "carStatus")}
            <ColumnGroup title="Device status" align = "center">
                {getStatusColumn("Font Camera", "fontCamStatus")}
                {getStatusColumn("Back Camera", "backCamStatus")}
                {getStatusColumn("Door Camera", "doorCamStatus")}
                {getStatusColumn("Driver Camera", "driverCamStatus")}
                {getStatusColumn("Drowsiness Modul", "drowsinessModuleStatus")}
                {getStatusColumn("Accident Module", "accidentModuleStatus")}
            </ColumnGroup>     
            <Column title="Inspect" key="inspect" align = "center" 
                    render={(_: any, record: HeartbeatTableElement) => (
                        <a onClick={() => {console.log(record.id)}}>
                            <ApiOutlined />
                        </a>
                      )}/>
        </Table>
      </>
    )
  }
  
  export default DashboardHeartbeatOverviewPage
  