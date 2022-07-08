import useSWR from "swr"
import { TotalPassenger } from "../interfaces/Car"

const useTotalPassengers = () => {
  const { data, mutate, error } = useSWR<TotalPassenger>(
    `/api/cars/0/totalPassengers`,
    { refreshInterval: 1000 }
  )
  const loading = !data && !error

  return {
    data,
    mutate,
    error,
    loading,
  }
}

export default useTotalPassengers
