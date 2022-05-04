import { notificationTitle } from "../constants/Notification"
import { NotificationType } from "../interfaces/Notification"

export function getNotificationTitle(notiType?: NotificationType) {
  return notiType ? notificationTitle[notiType] : "Notification"
}
