import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import CarsLocationMap from "../components/widgets/overview/CarsLocationMap"
import useRealTimeOverview from "../hooks/socket/useRealtimeOverview"

const MapPage = () => {
  const [param] = useSearchParams()
  const [id, setID] = useState<string>()
  const [location, setLocation] = useState<string>()
  const { cars } = useRealTimeOverview()

  useEffect(() => {
    if (param.get("id") != null) {
      setID(param.get("id") as string)
    }

    if (param.get("location") != null) {
      setLocation(param.get("location") as string)
    }
  }, [param])

  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight }}>
      <CarsLocationMap
        showVehicleID={true}
        hideVehicleID={false}
        cars={cars}
        currentID={id}
        showActionInModal={false}
        showPassengersInCarPin={true}
        locationString={location}
      />
    </div>
  )
}

export default MapPage
