import axios, { AxiosError, AxiosResponse } from 'axios'
import useSWR from 'swr'

import { CreateDashboardPayload } from '../interfaces/CreateDashboardPayload'
import { Dashboard } from '../interfaces/Dashboard'
import { UpdateDashboardPayload } from '../interfaces/UpdateDashboardPayload'
import { WebServiceError } from '../interfaces/WebServiceError'

import axiosFetcher from '../utils/axiosFetcher'

const useDashboards = () => {
  const { data, error, mutate } = useSWR<
    Dashboard[],
    AxiosError<WebServiceError>
  >('/api/dashboards', axiosFetcher)

  const createDashboard = async (payload: CreateDashboardPayload) => {
    const response = await axios.post<
      Dashboard,
      AxiosResponse<Dashboard>,
      CreateDashboardPayload
    >('/api/dashboards', payload)
    await mutate()
    console.log(response)
    return response.data
  }

  const updateDashboard = async (
    id: string,
    payload: UpdateDashboardPayload
  ) => {
    const response = await axios.patch<
      Dashboard,
      AxiosResponse<Dashboard>,
      UpdateDashboardPayload
    >(`/api/dashboards/${id}`, payload)
    await mutate()
    console.log(response)
    return response.data
  }

  const deleteDashboard = async (id: string) => {
    const response = await axios.delete<Dashboard, AxiosResponse<Dashboard>>(
      `/api/dashboards/${id}`
    )
    await mutate()
    console.log(response)
    return response.data
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
