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
                        (value, record:HeartbeatTableElement) => (record[keyAndIndex as keyof HeartbeatTableElement] as Status).indexOf(value.toString()) === 0
                    }

                />
    }

    return(
        <Table loading={ data ? false:true}  dataSource={[...data]} bordered = {true} sticky = {true} size="small"
            onRow={(record, rowIndex) => {
                return {
                    onMouseEnter: event => {console.log(record);}
                }
            }}> 
            <Column title="ID" dataIndex="id" key="id" align = "center"/>
            {getStatusColumn("Vehicle status", "carStatus")}
            <ColumnGroup title="Device status" align = "center">
                {getStatusColumn("Font Camera", "cameraSeatsFront")}
                {getStatusColumn("Back Camera", "cameraSeatsBack")}
                {getStatusColumn("Door Camera", "cameraDoor")}
                {getStatusColumn("Driver Camera", "cameraDriver")}
                {getStatusColumn("Drowsiness Module", "drowsinessModule")}
                {getStatusColumn("Accident Module", "accidentModule")}
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