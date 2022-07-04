import useSWR from "swr"
import { Car } from "../interfaces/Car"

const useCar = (carId: string) => {
  const { data, mutate, error } = useSWR<Car>(`/api/cars/${carId}`, {
    refreshInterval: 1000,
  })
  const loading = !data && !error

  return {
    car: data,
    mutate,
    error,
    loading,
  }
}

export default useCar
