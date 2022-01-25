import ReactGridLayout from 'react-grid-layout'
import { DashboardItem } from './DashboardItem'

export interface LayoutWithDashboardItem extends ReactGridLayout.Layout {
  dashboardItem: DashboardItem
}
