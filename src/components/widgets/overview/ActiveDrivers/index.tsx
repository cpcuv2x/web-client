import BigNumber from "../../BigNumber"

interface props {
  activeTotalDrivers: {
    active: number
    total: number
  }
}

const ActiveDrivers: React.FC<props> = ({ activeTotalDrivers }) => {
  return (
    <BigNumber
      title="Active Driver(s)"
      helpText="Total number of drivers that are driving."
      value={`${activeTotalDrivers.active} / ${activeTotalDrivers.total}`}
    />
  )
}

export default ActiveDrivers
