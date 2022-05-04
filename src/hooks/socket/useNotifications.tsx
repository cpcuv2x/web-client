import useSWR from "swr"
import { NotificationInfo } from "../../interfaces/Notification"

function compare(a: NotificationInfo, b: NotificationInfo) {
  if (a?.Notification?.timestamp > b?.Notification?.timestamp) return -1
  if (a?.Notification?.timestamp < b?.Notification?.timestamp) return 1
  return 0
}

// FIXME: handle pagination
const useNotifications = () => {
  const url = `/api/notifications`

  const { data, mutate, error } = useSWR<NotificationInfo[]>(url)

  const loading = !data && !error

  const allUnread = data ? data.filter((item) => !item.read) : []
  const allRead = data ? data.filter((item) => item.read) : []

  return {
    notifications: data ?? [],
    unread: allUnread.sort(compare).slice(0, 20),
    read: allRead.sort(compare).slice(0, 20),
    totalUnread: allUnread.length,
    totalRead: allRead.length,
    mutate,
    error,
    loading,
  }
}

export default useNotifications
