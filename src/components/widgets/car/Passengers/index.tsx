import React, { useEffect, useState } from "react"
import BigNumber from "../../BigNumber"

interface Props {
  carId: string
}

const Passengers: React.FC<Props> = () => {
  //FIXME: use real value
  const [value, setValue] = useState(5)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue(8 + Math.floor(Math.random() * 3))
    }, 1500)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <BigNumber
      title="Current Passenger(s)"
      helpText="Total number of passengers in this car."
      value={value}
    />
  )
}

export default Passengers
