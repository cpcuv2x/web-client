import useSWR from "swr"
import { AccidentLogByCar } from "../interfaces/Car"

interface Filter {
  startTime?: string
  endTime?: string
}

const useAccidentsLogByCar = (
  carId: string,
  startTime: string,
  endTime: string
) => {
  const filter: Filter = {}
  if (startTime) filter["startTime"] = startTime
  if (endTime) filter["endTime"] = endTime

  const queryString = new URLSearchParams(Object.entries(filter)).toString()

  const { data, mutate, error } = useSWR<AccidentLogByCar[]>(
    `/api/cars/${carId}/accidents?${queryString}`
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
