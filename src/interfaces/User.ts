export interface User {
  username: string
  role: UserRole
}

export enum UserRole {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
}
