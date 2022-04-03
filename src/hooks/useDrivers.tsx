import useSWR from "swr"
import { DriversFilters, DriversResponse } from "../interfaces/Driver"

const useDrivers = (filters: DriversFilters = {}) => {
  // FIXME: Change back to normal filters
  const tmpFilters: DriversFilters = {
    limit: 100,
    offset: 0,
    ...filters,
  }
  const queryString = new URLSearchParams(Object.entries(tmpFilters)).toString()
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
