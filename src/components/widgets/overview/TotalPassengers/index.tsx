import useTotalPassengers from "../../../../hooks/useTotalPassengers"
import BigNumber from "../../BigNumber"

const TotalPassengers = () => {
  const total = useTotalPassengers()
  return (
    <BigNumber
      title="Total Passenger(s)"
      helpText="Total number of passengers in all cars."
      value={total}
    />
  )
}

export default TotalPassengers
