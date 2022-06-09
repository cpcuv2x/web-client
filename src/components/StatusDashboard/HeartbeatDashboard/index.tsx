import { ApiOutlined } from "@ant-design/icons"
import { Table } from "antd"
import Column from "antd/lib/table/Column"
import ColumnGroup from "antd/lib/table/ColumnGroup"
import { HeartbeatTableElement, Status } from "../../../interfaces/Status"
import StatusCircle from "../StatusCircle"

const HeartbeatTableComponent:React.FC<{ data : HeartbeatTableElement[] }>  = ({data}) => {

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

    return(
        <Table loading={ data ? false:true}  dataSource={data} bordered = {true} sticky = {true} size="small"> 
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
    )
}

export default HeartbeatTableComponent;