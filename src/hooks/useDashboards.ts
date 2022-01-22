import axios, { AxiosError } from 'axios'
import useSWR, { mutate } from 'swr'

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
  const { data, error, mutate } = useSWR<
    Dashboard[],
    AxiosError<WebServiceError>
  >('/api/dashboards', fetcher)

  const createDashboard = async (payload: { name: string }) => {
    await axios.post('/api/dashboards', {
      name: payload.name,
    })
    await mutate()
  }

  const updateDashboard = async (id: string, payload: { name: string }) => {
    await axios.patch(`/api/dashboards/${id}`, { name: payload.name })
    await mutate()
  }

  const deleteDashboard = async (id: string) => {
    await axios.delete(`/api/dashboards/${id}`)
    await mutate()
  }

  return {
    dashboards: data,
    loading: !data && !error,
    error: error?.response?.data,
    createDashboard,
    updateDashboard,
    deleteDashboard,
  }
}

export default useDashboards
