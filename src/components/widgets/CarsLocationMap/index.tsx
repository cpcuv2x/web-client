import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import appConfig from "../../../configuration"
import useCars from "../../../hooks/useCars"
import useCarsLocations from "../../../hooks/useCarsLocations"

// Chulalongkorn university location
const center = {
  lat: 13.738498349970362,
  lng: 100.53259748277665,
}

const containerStyle = {
  width: "100%",
  height: "50vh",
}

const CarsLocationMap = () => {
  const { cars } = useCars()
  const carIds = cars.map((car) => car.id)
  const locations = useCarsLocations(carIds)

  return (
    <LoadScript googleMapsApiKey={appConfig.googleMapAPIKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        {Object.entries(locations).map(([carId, location]) => (
          <Marker key={carId} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default CarsLocationMap
