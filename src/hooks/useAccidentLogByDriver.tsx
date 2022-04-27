import useSWR from "swr"
import { AccidentLogByDriver } from "../interfaces/Driver"

interface Filter {
  startTime?: string
  endTime?: string
}

const useAccidentLogByDriver = (
  driverId: string,
  startTime: string,
  endTime: string
) => {
  const filter: Filter = {}
  if (startTime) filter["startTime"] = startTime
  if (endTime) filter["endTime"] = endTime

  const queryString = new URLSearchParams(Object.entries(filter)).toString()

  const { data, mutate, error } = useSWR<AccidentLogByDriver[]>(
    `/api/drivers/${driverId}/accidents?${queryString}`
  )

  const loading = !data && !error

  return {
    accidents: data ?? [],
    mutate,
    error,
    loading,
  }
}

export default useAccidentLogByDriver
