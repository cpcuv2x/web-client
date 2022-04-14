import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import appConfig from "../../../configuration"
import useCars from "../../../hooks/useCars"

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
  const [position, setPosition] = useState<
    Record<string, { lat: number; lng: number }>
  >({})

  const [id, setId] = useState("")
  const socket = useRef<Socket>()

  const { cars } = useCars()

  useEffect(() => {
    if (cars.length) {
      const ids = cars.map(({ id }) => id)
      socket.current = io("http://localhost:5000/")
      socket.current?.on("connect", () => {
        console.log("connected")
        socket.current?.emit("START_STREAM_MAP_CARS", ids, (id: any) => {
          console.log("id", id)
          setId(id)
          socket.current?.on(id, (x: any) => {
            console.log(x)
            setPosition((prev) => ({
              ...prev,
              [x.carId]: { lat: x.lng, lng: x.lat },
            }))
          })
        })
      })
    }
    return () => {
      socket.current?.close()
    }
  }, [cars])

  const onDisconnect = () => {
    socket.current?.emit("STOP_STREAM", id)
  }

  return (
    <>
      {position.lat}
      <LoadScript googleMapsApiKey={appConfig.googleMapAPIKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          {cars.map(({ id }) =>
            position[id] ? <Marker key={id} position={position[id]} /> : <></>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default CarsLocationMap
