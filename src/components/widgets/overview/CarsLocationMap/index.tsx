import { GoogleMap, LoadScript } from "@react-google-maps/api"
import appConfig from "../../../../configuration"
import useCarsLocations from "../../../../hooks/socket/useCarsLocations"
import useCars from "../../../../hooks/useCars"
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

const CarsLocationMap = () => {
  const { cars } = useCars()
  const carIds = cars.map((car) => car.id)
  const locations = useCarsLocations(carIds)

  return (
    <LoadScript googleMapsApiKey={appConfig.googleMapAPIKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        {Object.entries(locations).map(
          ([carId, { lat, lng }]) =>
            lat != null &&
            lng != null && (
              <CarPin
                key={carId}
                position={{ lng: lat, lat: lng }}
                carId={carId}
              />
            )
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default CarsLocationMap
