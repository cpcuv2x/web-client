import useSWR from "swr"
import { CarAccident } from "../interfaces/Car"

const useAccidentsLogByCar = (
  carId: string,
  startTime: string,
  endTime: string
) => {
  const { data, mutate, error } = useSWR<CarAccident[]>(
    `/api/cars/${carId}/accidents?startTime=${startTime}&endTime=${endTime}`
  )

  const loading = !data && !error

  return {
    accidents: data ?? [],
    mutate,
    error,
    loading,
  }
}

export default useAccidentsLogByCar
