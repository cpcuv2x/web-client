import useSWR from "swr"

interface CarFilters {
  licensePlate?: string
  model?: string
  imageFilename?: string
  status?: "ACTIVE" | "INACTIVE"
  minPassengers?: string
  maxPassengers?: string
}

const useCars = (filter: CarFilters, limit: number, offset: number) => {
  const query = {
    limit: limit.toString(),
    offset: offset.toString(),
    ...filter,
  }
  const queryString = new URLSearchParams(query).toString()
  const url = `/api/cars?${queryString}`

  const { data, mutate, error } = useSWR(url)

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
