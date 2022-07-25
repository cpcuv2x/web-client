import BigNumber from "../../BigNumber"

interface props {
  accidentCount: number
}

const AccidentCount: React.FC<props> = ({ accidentCount }) => {
  return (
    <BigNumber
      title="Accident Count"
      helpText="Total number of accident occurred."
      value={accidentCount}
    />
  )
}

export default AccidentCount
