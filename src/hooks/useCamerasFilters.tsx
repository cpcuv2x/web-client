import { useSearchParams } from "react-router-dom"
import { CamerasFilter, CamerasFilters } from "../interfaces/Camera"

export const filters: CamerasFilter[] = [
  "id",
  "name",
  "description",
  "streamUrl",
  "role",
  "status",
  "carId",
  "limit",
  "offset",
  "orderBy",
  "orderDir",
]

const useCamerasFilters = () => {
  const [params, setParams] = useSearchParams()

  const filtersObj: CamerasFilters = filters.reduce((prev, key) => {
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

export default useCamerasFilters
