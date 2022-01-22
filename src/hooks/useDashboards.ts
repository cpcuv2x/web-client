import axios, { AxiosError } from 'axios'
import useSWR from 'swr'

// FIXME: Use common fetcher
const fetcher = async (path: string) => {
  const response = await axios.get(path)
  return response.data
}

// FIXME: Move to another file
interface Dashboard {
  _id: string
  default: boolean
  name: string
  __v: number
}

// FIXME: Move to another file and make it common
interface WebServiceError {
  error: string
  message: string
  statusCode: number
}

const useDashboards = () => {
  const { data, error } = useSWR<Dashboard[], AxiosError<WebServiceError>>(
    '/api/dashboards',
    fetcher
  )
  return {
    dashboards: data,
    loading: !data && !error,
    error: error?.response?.data,
  }
}

export default useDashboards
