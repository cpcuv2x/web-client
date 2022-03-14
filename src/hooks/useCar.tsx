import useSWR from "swr"

const useCar = (carId: string) => {
  const { data, mutate, error } = useSWR(`/api/cars/${carId}`)
  const loading = !data && !error

  return {
    car: data ?? {},
    mutate,
    error,
    loading,
  }
}

export default useCar
