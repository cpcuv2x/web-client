import { GoogleMap, LoadScript } from "@react-google-maps/api"
import appConfig from "../../../../configuration"
import { CarOverviewInformation } from "../../../../interfaces/Overview"
import CarPin from "../CarPin"

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
}

const CarsLocationMap: React.FC<props> = ({
  showVehicleID,
  hideVehicleID,
  cars,
  currentID,
  showActionInModal = true,
  showPassengersInCarPin = false,
}) => {
  return (
    <LoadScript googleMapsApiKey={appConfig.googleMapAPIKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
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
