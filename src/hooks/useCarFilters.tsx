import { useSearchParams } from "react-router-dom"

const useCarFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = [
    { label: "License Plate", key: "licensePlate" },
    { label: "Model", key: "model" },
    { label: "Image file name", key: "imageFilename" },
    { label: "Status", key: "status" },
    { label: "Min Passengers", key: "minPassengers" },
    { label: "Max Passengers", key: "maxPassengers" },
  ]

  const filtersObject: Record<string, string> = filters.reduce(
    (previous, { key }) => {
      const filterValue = searchParams.get(key)
      if (filterValue)
        return {
          [key]: filterValue,
          ...previous,
        }
      else return previous
    },
    {}
  )

  const clearFilter = (key: string) => {
    const params = searchParams
    params.delete(key)
    setSearchParams(params)
  }

  const clearAllFilters = () => {
    const params = searchParams
    Object.keys(filtersObject).forEach((key) => {
      params.delete(key)
    })
    setSearchParams(params)
  }

  return {
    clearFilter,
    clearAllFilters,
    filters,
    filtersObject,
    searchParams,
    setSearchParams,
  }
}

export default useCarFilters
