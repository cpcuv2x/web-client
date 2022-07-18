import { useEffect, useState } from "react"
import useActiveDrivers from "../../../../hooks/socket/useActiveDrivers"
import BigNumber from "../../BigNumber"

const ActiveDrivers = () => {
  const { active, total } = useActiveDrivers()
  const [activeNumber, setActiveNumber] = useState<number>(0)
  const [totalNumber, setTotalNumber] = useState<number>(0)

  useEffect(() => {
    setActiveNumber(active != null ? active : 0)
    setTotalNumber(total != null ? total : 0)
  }, [active, total])

  return (
    <BigNumber
      title="Active Driver(s)"
      helpText="Total number of drivers that are driving."
      value={`${activeNumber} / ${totalNumber}`}
    />
  )
}

export default ActiveDrivers
