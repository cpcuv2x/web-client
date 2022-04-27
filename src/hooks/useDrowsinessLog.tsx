import useSWR from "swr"
import { DrowsinessLog } from "../interfaces/Driver"

interface Filter {
  startTime?: string
  endTime?: string
}

const useDrowsinessLog = (
  driverId: string,
  startTime: string,
  endTime: string
) => {
  const filter: Filter = {}
  if (startTime) filter["startTime"] = startTime
  if (endTime) filter["endTime"] = endTime

  const queryString = new URLSearchParams(Object.entries(filter)).toString()

  const { data, mutate, error } = useSWR<DrowsinessLog[]>(
    `/api/drivers/${driverId}/drowsiness?${queryString}`
  )

  const loading = !data && !error

  return {
    drowsiness: data ?? [],
    mutate,
    error,
    loading,
  }
}

export default useDrowsinessLog
