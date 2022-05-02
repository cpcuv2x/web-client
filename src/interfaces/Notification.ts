export interface Notification {
  id: string
  type: string
  message: string
  timestamp: string
  jsonMetadata: string
}

export interface NotificationInfo {
  id: string
  userId: string
  notificationId: string
  read: boolean
  Notification: Notification
}
