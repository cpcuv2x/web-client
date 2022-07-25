import BigNumber from "../../BigNumber"

interface props {
  activeTotalCars: {
    active: number
    total: number
  }
}

const ActiveCars: React.FC<props> = ({ activeTotalCars }) => {
  return (
    <BigNumber
      title="Active Vehicle(s)"
      helpText="Total number of vehicles that are operating."
      value={`${activeTotalCars.active} / ${activeTotalCars.total}`}
    />
  )
}

export default ActiveCars
