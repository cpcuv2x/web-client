import { ReadOutlined } from "@ant-design/icons";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Button, Col, Divider, Modal, Row, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import { AccidentLogByCar } from "../../../../interfaces/Car";
import busPin from "../../../../assets/bus_pin.svg"

const AccidentDetailMapComponent: React.FC<{ data:AccidentLogByCar }> = ({ data }) => {
    const zoom = 17;
    const [visible, setVisible] = useState<boolean>(false);
  
    const containerStyle = {
      width: 470,
      height: 470,
    }
    
    const center = {
      lat: data.lat,
      lng: data.long,
    }
  
    const closeModal = () =>{
      setVisible(false)
    }
  
    const openModal = () =>{
      setVisible(true)
    }

    const getCaptionText = (text:string) => {
      return <Typography.Text strong>{text}</Typography.Text>
    };
  
    return (
    <div>
      <Button icon = {<ReadOutlined/>} onClick={openModal}/>
      {
        visible&&
        <Modal 
          visible = {visible} 
          onCancel = {closeModal}
          title = {<Typography.Title level={4}>Detail of accident</Typography.Title>}
          footer = {<Button onClick={closeModal}>Ok</Button>}>
          <Row>
            <Col span={8}>
              {getCaptionText("ID: ")}{data.id}
            </Col>
            <Col span={8}>
              {getCaptionText("Car ID: ")}{data.carId}
            </Col>
            <Col span={8}>
              {getCaptionText("Driver ID: ")}{data.driverId}
            </Col>
          </Row>  
          <Row>
            <Col>
              {getCaptionText("Time Occurred: ")}{moment(data.timestamp).format("DD/MM/YYYY HH:mm:ss")}
              </Col>
          </Row>
          <Row>
            <Col span={12}>
              {getCaptionText("Latitude: ")}{data.lat}
            </Col>
            <Col span={12}>
              {getCaptionText("Longitude: ")}{data.long}
            </Col>
          </Row>
          <Divider>Map</Divider>
          <div>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
              <Marker icon={busPin} position={center}/>
            </GoogleMap>
          </div>
        </Modal>
      }  
    </div>
    )
}

export default AccidentDetailMapComponent;