import { GoogleMap, LoadScript } from "@react-google-maps/api"
import appConfig from "../../../../configuration"
import { CarOverviewInformation } from "../../../../interfaces/Overview"
import CarPin from "../CarPin"
import { Button } from "antd"
import { useEffect, useState } from "react"

// Chulalongkorn university location
const center = {
  lat: 13.740154,
  lng: 100.529732,
}

const containerStyle = {
  width: "100%",
  height: "100%",
}

interface props {
  showVehicleID: boolean
  hideVehicleID: boolean
  cars: CarOverviewInformation[]
  currentID?: string
  showActionInModal?: boolean
  showPassengersInCarPin?: boolean
  locationString?: string
}

const CarsLocationMap: React.FC<props> = ({
  showVehicleID,
  hideVehicleID,
  cars,
  currentID,
  showActionInModal = true,
  showPassengersInCarPin = false,
  locationString,
}) => {
  const [location, setLocation] = useState(
    locationString ? locationString : "chula"
  )
  const [center, setCenter] = useState({
    lat: 13.740154,
    lng: 100.529732,
  })
  const [zoom, setZoom] = useState(16)

  return (
    <>
      <div
        style={{
          //set position on right hand side
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <Button
          type={location === "chula" ? "primary" : "default"}
          onClick={() => {
            setLocation("chula")
            setCenter({ lat: 13.740154, lng: 100.529732 })
          }}
        >
          Chula
        </Button>
        <Button
          type={location === "sailom" ? "primary" : "default"}
          onClick={() => {
            setLocation("sailom")
            setCenter({ lat: 13.7830495, lng: 100.5484907 })
          }}
        >
          Sailom
        </Button>
      </div>
      <LoadScript
        googleMapsApiKey={appConfig.googleMapAPIKey}
        style={{
          position: "relative",
        }}
      >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
          zoom={location === "chula" ? 17 : 18}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
            maxZoom: 20,
          minZoom: 16,
          gestureHandling: "none",
        }}
      >
        {cars.map(
          (information) =>
            information.lat != null &&
            information.lng != null && (
              <CarPin
                key={information.id}
                information={information}
                showVehicleID={showVehicleID}
                hideVehicleID={hideVehicleID}
                currentID={currentID}
                showActionInModal={showActionInModal}
                showPassengersInCarPin={showPassengersInCarPin}
              />
            )
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default CarsLocationMap
