import { Dashboard } from './Dashboard'
import { DashboardItemAssociation } from './DashboardItemAssociation'

export interface DashboardWithItems extends Dashboard {
  items: DashboardItemAssociation[]
}
