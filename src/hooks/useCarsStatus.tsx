import useSWR from "swr"
import { StatusTableElement } from "../interfaces/Status"

const useCarsStatus = () => {
  const url = `/api/cars/status`

  const { data, mutate, error } = useSWR<StatusTableElement[]>(url)

  const loading = !data && !error

  return {
    cars: data ?? [],
    mutate,
    error,
    loading,
  }
}

export default useCarsStatus
