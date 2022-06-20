import { ApiOutlined } from "@ant-design/icons"
import { Table, Tooltip, Typography } from "antd"
import Column from "antd/lib/table/Column"
import ColumnGroup from "antd/lib/table/ColumnGroup"
import { HeartbeatTableElement, Status } from "../../../interfaces/Status"
import StatusCircle from "../StatusCircle"

const HeartbeatTableComponent:React.FC<{ data : HeartbeatTableElement[], lastUpdate:string }>  = ({data, lastUpdate}) => {

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
                        }
                    ]}
                    onFilter = {
                        (value, record:HeartbeatTableElement) => record[keyAndIndex as keyof HeartbeatTableElement] !== undefined && (record[keyAndIndex as keyof HeartbeatTableElement] as Status).indexOf(value.toString()) === 0 
                    }

                />
    }

    const getMinuteDiffer = (a: Date, b: Date) => {
        return Math.floor((a.getTime() - b.getTime())/(60*1000));
    }

    const getTooltipTitle = (record:HeartbeatTableElement) => {

        let output = "";

        const lastUpdateDatetime = new Date(lastUpdate);
        const carTimestamp = record.carTimestamp;

        //Using a juggling-check, you can test both null and undefined in one hit:
        if(carTimestamp != null){
            output  = "Car connected    : " + getMinuteDiffer(lastUpdateDatetime, new Date(carTimestamp!)).toString() + " m(s).\n"
        }
        
        const cameraTimestamp = record.cameraTimestamp;
        if(carTimestamp != null){
            output += "Camera connected : " + getMinuteDiffer(lastUpdateDatetime, new Date(cameraTimestamp!)).toString() + " m(s).\n"
        }

        const modeuleTimestamp = record.moduleTimestamp;
        if(modeuleTimestamp != null){
            output += "Module connected : " + getMinuteDiffer(lastUpdateDatetime, new Date(modeuleTimestamp!)).toString() + " m(s).\n"
        }

        return output;
    }

    return(
        <Table loading={ data ? false:true}  dataSource={[...data]} bordered = {true} sticky = {true} size="small" 
            title={() => (<Typography.Text>Last update : {lastUpdate}</Typography.Text>)}> 
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
                        <Tooltip placement="topLeft" title={getTooltipTitle(record)} overlayStyle={{ whiteSpace: 'pre-line' }}>
                            <ApiOutlined />
                        </Tooltip>
                      )}/>
        </Table>
    )
}

export default HeartbeatTableComponent;