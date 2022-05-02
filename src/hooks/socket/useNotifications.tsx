import useSWR from "swr"
import { NotificationInfo } from "../../interfaces/Notification"

const useNotifications = () => {
  const url = `/api/notifications`

  const { data, mutate, error } = useSWR<NotificationInfo[]>(url)

  const loading = !data && !error

  return {
    notifications: data ?? [],
    mutate,
    error,
    loading,
  }
}

export default useNotifications
