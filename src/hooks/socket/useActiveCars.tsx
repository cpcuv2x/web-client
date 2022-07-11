import useSWR from "swr"

interface ActiveDriversResponse {
  active: number
  total: number
}

const useActiveCars = () => {
  const { data, mutate, error } = useSWR<ActiveDriversResponse>(
    `/api/cars/activeAndTotal`,
    { refreshInterval: 1000 }
  )
  const loading = !data && !error

  return {
    ...data,
    mutate,
    error,
    loading,
  }
}

export default useActiveCars
