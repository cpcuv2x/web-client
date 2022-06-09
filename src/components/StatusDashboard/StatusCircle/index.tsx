import { Avatar } from "antd"
import React, {useState, useEffect} from "react"
import { Status } from "../../../interfaces/Status";

const StatusCircle: React.FC<{status:Status}> = ({status}) =>{
    const [color, setColor] = useState("red");
    useEffect(() => {
        setColor(status===Status.ACTIVE ? "green": "red");
    }, [status])
    return(
        <>
            <Avatar style = {{backgroundColor:color, width: '10px', height: '10px'}}></Avatar>
        </>
    )
}

export default StatusCircle;