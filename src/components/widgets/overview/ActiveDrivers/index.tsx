import useActiveDrivers from "../../../../hooks/socket/useActiveDrivers"
import BigNumber from "../../BigNumber"

const ActiveDrivers = () => {
  const { active, total } = useActiveDrivers()
  return (
    <BigNumber
      title="Active Driver(s)"
      helpText="Total number of drivers that are driving."
      value={`${active} / ${total}`}
    />
  )
}

export default ActiveDrivers
