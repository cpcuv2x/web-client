import useSWR from "swr"
import { TotalPassenger } from "../interfaces/Car"

const useTotalPassengers = () => {
  const { data, mutate, error } = useSWR<TotalPassenger>(
    `/api/cars/0/totalPassengers`
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
