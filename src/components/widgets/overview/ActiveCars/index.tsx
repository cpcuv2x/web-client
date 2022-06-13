import useActiveCars from "../../../../hooks/socket/useActiveCars"
import BigNumber from "../../BigNumber"

const ActiveCars = () => {
  const { active, total } = useActiveCars()
  return (
    <BigNumber
      title="Active Vehicle(s)"
      helpText="Total number of vehicles that are operating."
      value={`${active} / ${total}`}
    />
  )
}

export default ActiveCars
