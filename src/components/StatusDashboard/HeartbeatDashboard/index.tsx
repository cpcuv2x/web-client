import { ApiOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Table, Tooltip, Typography } from "antd"
import Column from "antd/lib/table/Column"
import ColumnGroup from "antd/lib/table/ColumnGroup"
import { HeartbeatStatus } from "../../../interfaces/HeartbeatStatus"
import { Status } from "../../../interfaces/Status"
import StatusCircle from "../StatusCircle"


const HeartbeatTableComponent:React.FC<{ data : HeartbeatStatus[], lastUpdate:string }>  = ({data, lastUpdate}) => {

    if(!data) return <>downloading</>

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
                        (value, record:HeartbeatStatus) => record["status"] !== undefined 
                                                            && (record["status"]).indexOf(value.toString()) === 0 
                    }

                />
    }
    
    const getCameraStatusColumn = (title : string , index : number) => {
        return <Column title={title} key={"camera_status_"+index.toString()} align = "center"
                    render={(value, record:HeartbeatStatus, _) => (<StatusCircle status={record.Camera![index] ? record.Camera![index]["status"] : undefined}/>)}
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
                        (value, record:HeartbeatStatus) => record.Camera![index]["status"] !== undefined 
                                                            && (record.Camera![index]["status"]).indexOf(value.toString()) === 0 
                    }

                />
    }
    const getModuleStatusColumn = (title : string , index : number) => {
        return <Column title={title} key={"module_status_"+index.toString()} align = "center"
                    render={(value, record:HeartbeatStatus, _) => (<StatusCircle status={record.Module![index] ? record.Module![index]["status"] : undefined}/>)}
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
                        (value, record:HeartbeatStatus) => record.Module![index]["status"] !== undefined 
                                                            && (record.Module![index]["status"]).indexOf(value.toString()) === 0 
                    }

                />
    }

    const getMinuteDiffer = (a: Date, b: Date) => {
        return Math.floor((a.getTime() - b.getTime())/(60*1000));
    }

    const getTooltipTitle = (record:HeartbeatStatus) => {

        let output = "";

        const lastUpdateDatetime = new Date(lastUpdate);
        const carTimestamp = record.timestamp;

        //Using a juggling-check, you can test both null and undefined in one hit:
        if(carTimestamp != null){
            output  = "Car    : " + getMinuteDiffer(lastUpdateDatetime, new Date(carTimestamp!)).toString() + " m(s) ago.\n"
        }
        
        const camera = record.Camera;
        if(camera != null &&  camera[0] != undefined){
            const cameraTimestamp = camera[0].timestamp;
            if(carTimestamp != null){
                output += "Camera : " + getMinuteDiffer(lastUpdateDatetime, new Date(cameraTimestamp!)).toString() + " m(s) ago.\n"
            }
        }

        const module = record.Module;
        if(module != null && module[0] != undefined){
            const modeuleTimestamp = module[0].timestamp;
            if(modeuleTimestamp != null){
                output += "Module : " + getMinuteDiffer(lastUpdateDatetime, new Date(modeuleTimestamp!)).toString() + " m(s) ago.\n"
            }
        }

        return output;
    }

    const getTitle = () => {
        return <div>
                <Typography.Text>Last update : {lastUpdate}</Typography.Text>
                <div style={{float:"right"}}>
                    <Tooltip 
                        title={"The table shows the heatbeat status of cars and their devices which are sent in every 60 seconds.\n If the last heartbeat message of a car was send longer than 80 seconds ago, the car will be treated as an INACTIVE car."} 
                        placement="topRight"
                        overlayStyle={{ whiteSpace: 'pre-line' }}
                        style = {{marginLeft : "auto", marginRight : 0}}>
                        <InfoCircleOutlined />
                    </Tooltip>
                </div>
            </div>
    }

    return(
        <Table loading={ data ? false:true}  dataSource={[...data]} bordered = {true} sticky = {true} size="small" 
            title={() => (getTitle())}
            onRow={(record, rowIndex) => {
                return {
                onMouseEnter: event => {console.log(record)}, // mouse enter row
                };
            }}> 
            <Column title="ID" dataIndex="id" key="id" align = "center"/>
            {getStatusColumn("Vehicle status", "status")}
            <ColumnGroup title="Device status" align = "center">
                {getCameraStatusColumn("Font Camera", 2)}
                {getCameraStatusColumn("Back Camera", 3)}
                {getCameraStatusColumn("Door Camera", 0)}
                {getCameraStatusColumn("Driver Camera", 1)}
                {getModuleStatusColumn("Drowsiness Module", 0)}
                {getModuleStatusColumn("Accident Module", 1)}
            </ColumnGroup>     
            <Column title="Inspect" key="inspect" align = "center" 
                    render={(_: any, record: HeartbeatStatus) => (
                        <Tooltip placement="topLeft" title={getTooltipTitle(record)} overlayStyle={{ whiteSpace: 'pre-line' }}>
                            <ApiOutlined />
                        </Tooltip>
                    )}/>
        </Table>
    )
}

export default HeartbeatTableComponent;