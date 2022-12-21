import useSWR from "swr"
import { AccidentLogByCar } from "../interfaces/Car"
// import useCars from "./useCars"

interface Filter {
  startTime?: string
  endTime?: string
}

const useAccidentsLogByAllCar = (startTime: string, endTime: string) => {
  const filter: Filter = {}
  if (startTime) filter["startTime"] = startTime
  if (endTime) filter["endTime"] = endTime

  const queryString = new URLSearchParams(Object.entries(filter)).toString()

  //   const carIds = useCars().cars.map((car) => car.id)

  //useSWR<AccidentLogByCar[]>(`/api/cars/${carId}/accidents?${queryString}`) for all carIds
  const fetcher = (...urls: string[]) => {
    const f = (url: string) => fetch(url).then((r) => r.json())
    return Promise.all(urls.map((url) => f(url)))
  }

  const urls = [
    `/api/cars/V0001/accidents?${queryString}`,
    `/api/cars/V0002/accidents?${queryString}`,
    `/api/cars/V0003/accidents?${queryString}`,
  ]
  const { data, error } = useSWR<AccidentLogByCar[]>(urls, fetcher)
  //   return {
  //     data: data,
  //     isError: !!error,
  //     isLoading: !data && !error,
  //   }

  //   const {
  //     data: data2,
  //     mutate: mutate2,
  //     error: error2,
  //   } = useSWR<AccidentLogByCar[]>(`/api/cars/${carId}/accidents?${queryString}`)
  //   const {
  //     data: data3,
  //     mutate: mutate3,
  //     error: error3,
  //   } = useSWR<AccidentLogByCar[]>(`/api/cars/${carId}/accidents?${queryString}`)

  //   const loading = !data && !error

  return {
    data: data ?? [],
    error,
    loading: !data && !error,
  }
}

export default useAccidentsLogByAllCar
