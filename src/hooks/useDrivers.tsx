import useSWR from "swr"
import { DriversFilters, DriversResponse } from "../interfaces/Driver"

const useDrivers = (filters: DriversFilters = {}) => {
  const queryString = new URLSearchParams(Object.entries(filters)).toString()
  const url = `/api/drivers?${queryString}`

  const { data, mutate, error } = useSWR<DriversResponse>(url)

  const loading = !data && !error

  return {
    drivers: data?.drivers ?? [],
    count: data?.count ?? 0,
    mutate,
    error,
    loading,
  }
}

export default useDrivers
