import useSWR from "swr"

interface DriverFilters {
  firstName?: string
  lastName?: string
  nationalId?: string
  carDrivingLicenseId?: string
  imageFilename?: string
}

const useDrivers = (filter: DriverFilters, limit: number, offset: number) => {
  const query = {
    limit: limit.toString(),
    offset: offset.toString(),
    ...filter,
  }
  const queryString = new URLSearchParams(query).toString()
  const url = `/api/drivers?${queryString}`
  const { data, mutate, error } = useSWR(url)

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
