import useActiveCars from "../../../../hooks/useActiveCars"
import BigNumber from "../../BigNumber"

const ActiveCars = () => {
  const { active, total } = useActiveCars()
  return (
    <BigNumber
      title="Active Car(s)"
      helpText="Total number of cars that are operating."
      value={`${active} / ${total}`}
    />
  )
}

export default ActiveCars
