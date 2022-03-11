import { GoogleMap, LoadScript } from "@react-google-maps/api"

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
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      ></GoogleMap>
    </LoadScript>
  )
}

export default CarsLocationMap
