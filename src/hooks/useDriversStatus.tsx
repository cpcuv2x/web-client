import useSWR from "swr"
import { StatusTableElement } from "../interfaces/Status"

const useDriversStatus = () => {
  const url = `/api/drivers/status`

  const { data, mutate, error } = useSWR<StatusTableElement[]>(url)

  const loading = !data && !error

  return {
    drivers: data ?? [],
    mutate,
    error,
    loading,
  }
}

export default useDriversStatus
