export interface Notification {
  id: string
  type: NotificationType
  message: string
  timestamp: string
  jsonMetadata: string
}

export enum NotificationType {
  ACCIDENT = "ACCIDENT",
  DROWSINESS = "DROWSINESS",
}

export interface NotificationInfo {
  id: string
  userId: string
  notificationId: string
  read: boolean
  Notification: Notification
}
