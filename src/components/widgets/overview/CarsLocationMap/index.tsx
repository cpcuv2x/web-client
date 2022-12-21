import { GoogleMap, LoadScript } from "@react-google-maps/api"
import appConfig from "../../../../configuration"
import { CarOverviewInformation } from "../../../../interfaces/Overview"
import CarPin from "../CarPin"
import { Button } from "antd"
import { useEffect, useState } from "react"
import useAccidentsLogByCar from "../../../../hooks/useAccidentsLogByCar"
import moment, { Moment } from "moment"
import AccidentPin from "../AccidentPin"
import useAccidentsLogByAllCar from "../../../../hooks/useAccidentsLogByAllCar"
import { AccidentLogByCar } from "../../../../interfaces/Car"

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

  type EventValue<DateType> = DateType | null
  type RangeValue<DateType> =
    | [EventValue<DateType>, EventValue<DateType>]
    | null
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>([
    moment().subtract(1, "hours"),
    moment(),
  ])

  const carIds = cars.map((car) => car.id)
  const [allAccidents, setAllAccidents] = useState<AccidentLogByCar[]>()
  const startTime =
    dateRange?.length && dateRange[0] ? dateRange[0].toISOString() : ""
  const endTime =
    dateRange?.length && dateRange[1] ? dateRange[1].toISOString() : ""
  // const { accidents, loading, mutate } = useAccidentsLogByCar(
  //   carIds[0],
  //   startTime,
  //   endTime
  // )

  const { data: accidents, loading } = useAccidentsLogByAllCar(
    startTime,
    endTime
  )

  useEffect(() => {
    if (accidents) {
      setAllAccidents(accidents)
      console.log(allAccidents)
    }
  }, [accidents])
  //use useAccidentsLohByCar hook to get accidents for all carIds

  //FIXME : Mock up data
  const mockUpAccident = [
    {
      id: "A0001",
      carId: "V0001",
      driverId: "D0001",
      lat: 13.739839,
      long: 100.531367,
      timestamp: "1671630224835",
    },
    {
      id: "A0002",
      carId: "V0001",
      driverId: "D0001",
      lat: 13.739839,
      long: 100.531367,
      timestamp: "1671630224835",
    },
    {
      id: "A0003",
      carId: "V0001",
      driverId: "D0001",
      lat: 13.737157,
      long: 100.529303,
      timestamp: "1671630224835",
    },
    {
      id: "A0004",
      carId: "V0001",
      driverId: "D0001",
      lat: 13.782747,
      long: 100.548444,
      timestamp: "1671630224835",
    },
    {
      id: "A0005",
      carId: "V0001",
      driverId: "D0001",
      lat: 13.783998,
      long: 100.547993,
      timestamp: "1671630224835",
    },
  ]

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
          {mockUpAccident.map(
            (accident) =>
              accident.lat != null &&
              accident.long != null && (
                <AccidentPin key={accident.id} information={accident} />
              )
          )}

          {allAccidents?.map(
            (accident) =>
              accident.lat != null &&
              accident.long != null && (
                <AccidentPin key={accident.id} information={accident} />
              )
          )}
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default CarsLocationMap
