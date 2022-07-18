import { useEffect, useState } from "react"
import useActiveCars from "../../../../hooks/socket/useActiveCars"
import BigNumber from "../../BigNumber"

const ActiveCars = () => {
  const { active, total } = useActiveCars()
  const [activeNumber, setActiveNumber] = useState<number>(0)
  const [totalNumber, setTotalNumber] = useState<number>(0)

  useEffect(() => {
    setActiveNumber(active != null ? active : 0)
    setTotalNumber(total != null ? total : 0)
  }, [active, total])

  return (
    <BigNumber
      title="Active Vehicle(s)"
      helpText="Total number of vehicles that are operating."
      value={`${activeNumber} / ${totalNumber}`}
    />
  )
}

export default ActiveCars
