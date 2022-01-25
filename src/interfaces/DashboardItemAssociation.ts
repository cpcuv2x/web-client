import { DashboardItem } from './DashboardItem'

export interface DashboardItemAssociation {
  _id: string
  dashboardItem: DashboardItem
  x: number
  y: number
  w: number
  h: number
  __v: number
}
