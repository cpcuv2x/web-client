import useSWR from "swr"
import { CarsFilters, CarsResponse } from "../interfaces/Car"

const useCars = (filters: CarsFilters = {}) => {
  const queryString = new URLSearchParams(Object.entries(filters)).toString()
  const url = `/api/cars?${queryString}`

  const { data, mutate, error } = useSWR<CarsResponse>(url)

  const loading = !data && !error

  return {
    cars: data?.cars ?? [],
    count: data?.count ?? 0,
    mutate,
    error,
    loading,
  }
}

export default useCars
