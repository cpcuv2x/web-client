export interface User {
  id: string
  username: string
  role: UserRole
}

export enum UserRole {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
}
