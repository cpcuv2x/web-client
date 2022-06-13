import {
    AreaChartOutlined,
    ControlOutlined,
    LeftOutlined,
    RightOutlined,
    UserOutlined,
  } from "@ant-design/icons"
  import { Button, Col, Row, Space, Typography } from "antd"
  import { Helmet } from "react-helmet"
  import { useNavigate, useParams } from "react-router-dom"
  import CopyToClipboardButton from "../../CopyToClipboardButton"
  import PageBreadcrumb from "../../PageBreadcrumb"
  import AccidentLogByDriverTable from "../../widgets/driver/AccidentLogByDriverTable"
  import DriverECRChart from "../../widgets/driver/DriverECRChart"
  import DriverImage from "../../widgets/driver/DriverImage"
  import DriverInformation from "../../widgets/driver/DriverInformation"
  import DrowsinessLogTable from "../../widgets/driver/DrowsinessLogTable"
  import useDriver from "../../../hooks/useDriver"
  import { routes } from "../../../routes/constant"
  
  const DashboardDriverComponent:React.FC<{ driverId : string, setStatusFullSize : any, statusFullSize : boolean}> 
    = ({ driverId, setStatusFullSize, statusFullSize }) => {

    const navigate = useNavigate()
  
    const { driver, loading, error } = useDriver(driverId)
  
    if (loading) return <div>Loading...</div>
  
    if (error || !driver) return <div>An error occurred.</div>
  
    return (
      <>
        <Row justify="space-between" style={{margin:10}}>
            <Col>
            <Space>
                <Button 
                onClick={()=>{setStatusFullSize(!statusFullSize)}}
                icon = {statusFullSize ? <LeftOutlined/>: <RightOutlined/>}
                style = {{width:30, height: 30}}>
                </Button>
                <Typography.Title level={3} style = {{transform:"translate(0%, 10%)"}}>Driver: {driver.id}</Typography.Title>
            </Space>
            </Col>
            <Col>
            <Button
                style={{width:"100%", transform:"translate(0%, 30%)"}}
                type="primary"
                icon={<ControlOutlined />}
                onClick={() => {
                navigate(`${routes.ENTITY_CAR}?id=${driverId}`)
                }}>
                Manage driver
            </Button>
            </Col>
        </Row>
    
        <Row gutter={[16, 16]}>
          <Col span={7}>
            <DriverImage driverId={driverId} />
          </Col>
          <Col span={17}>
            <DriverECRChart driverId={driverId} />
          </Col>
          <Col span={24}>
            <DriverInformation driverId={driverId} />
          </Col>
          <Col span={24}>
            <DrowsinessLogTable driverId={driverId} />
          </Col>
          <Col span={24}>
            <AccidentLogByDriverTable driverId={driverId} />
          </Col>
        </Row>
      </>
    )
  }
  
  export default DashboardDriverComponent
  