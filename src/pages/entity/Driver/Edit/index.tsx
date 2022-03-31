import React from "react"
import { useParams } from "react-router-dom"

const EntityDriverEditPage: React.FC = () => {
  const { driverId } = useParams()
  if (!driverId) return <div>Loading...</div>
  return <div>edit driver: {driverId}</div>
}

export default EntityDriverEditPage
