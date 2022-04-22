import useSWR from "swr"
import { CamerasFilters, CamerasResponse } from "../interfaces/Camera"

const useCameras = (filters: CamerasFilters = {}) => {
  const queryString = new URLSearchParams(Object.entries(filters)).toString()
  const url = `/api/cameras?${queryString}`

  const { data, mutate, error } = useSWR<CamerasResponse>(url)

  const loading = !data && !error

  return {
    cameras: data?.cameras ?? [],
    count: data?.count ?? 0,
    mutate,
    error,
    loading,
  }
}

export default useCameras
