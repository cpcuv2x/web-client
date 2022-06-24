import { Avatar, Button } from "antd"
import React, {useState, useEffect} from "react"
import { Status } from "../../../interfaces/Status";

const StatusCircle: React.FC<{status:Status|undefined}> = ({status}) =>{
    const [color, setColor] = useState("red");
    useEffect(() => {
        if(status===Status.ACTIVE) setColor("#03a905");
        else if (status===Status.INACTIVE ) setColor("#f95656");
        else setColor("silver");
    }, [status])
    return(
        <>
            <Avatar style = {{backgroundColor:color, width: '10px', height: '10px'}}></Avatar>
        </>
    )
}

export default StatusCircle;