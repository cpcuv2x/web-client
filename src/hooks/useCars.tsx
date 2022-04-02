import useSWR from "swr"
import { CarsFilter, CarsResponse } from "../interfaces/Car"

const useCars = (filter: CarsFilter = {}) => {
  const queryString = new URLSearchParams(Object.entries(filter)).toString()
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
