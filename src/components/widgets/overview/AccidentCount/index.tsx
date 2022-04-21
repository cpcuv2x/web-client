import useAccidentCount from "../../../../hooks/socket/useAccidentCount"
import BigNumber from "../../BigNumber"

const AccidentCount = () => {
  const total = useAccidentCount()
  return (
    <BigNumber
      title="Accident Count"
      helpText="Total number of accident occurred."
      value={total}
    />
  )
}

export default AccidentCount
