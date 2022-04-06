import useSWR from "swr"
import { Driver } from "../interfaces/Driver"

const useDriver = (driverId: string) => {
  const { data, mutate, error } = useSWR<Driver>(`/api/drivers/${driverId}`)
  const loading = !data && !error

  return {
    driver: data,
    mutate,
    error,
    loading,
  }
}

export default useDriver
