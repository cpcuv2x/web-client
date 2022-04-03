import { useSearchParams } from "react-router-dom"
import { CarsFilter, CarsFilters } from "../interfaces/Car"

export const filters: CarsFilter[] = [
  "licensePlate",
  "model",
  "status",
  "minPassengers",
  "maxPassengers",
  "limit",
  "offset",
  "orderBy",
  "orderDir",
]

const useCarsFilters = () => {
  const [params, setParams] = useSearchParams()

  const filtersObj: CarsFilters = filters.reduce((prev, key) => {
    const value = params.get(key)
    return value ? { [key]: value, ...prev } : prev
  }, {})

  function set(key: string, value: string) {
    const newParams = new URLSearchParams(params)
    newParams.set(key, value)
    setParams(newParams)
  }

  function clear(key: string) {
    const newParams = new URLSearchParams(params)
    newParams.delete(key)
    setParams(newParams)
  }

  function clearAll() {
    const newParams = new URLSearchParams(params)
    filters.forEach((key) => {
      newParams.delete(key)
    })
    setParams(newParams)
  }

  return {
    clear,
    clearAll,
    filtersObj,
    set,
  }
}

export default useCarsFilters
