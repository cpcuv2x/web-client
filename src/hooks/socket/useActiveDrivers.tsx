import useSWR from "swr"

interface ActiveDriversResponse {
  active: number
  total: number
}

const useActiveDrivers = () => {
  const { data, mutate, error } = useSWR<ActiveDriversResponse>(
    `/api/drivers/activeAndTotal`,
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

export default useActiveDrivers
