import { Breadcrumb } from "antd"
import React from "react"

interface BreadcrumbItem {
  label: string
  icon?: React.ReactNode
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

const PageBreadcrumb: React.FC<Props> = ({ items }: Props) => {
  return (
    <Breadcrumb>
      {items.map(({ label, icon, href }) => {
        return (
          <Breadcrumb.Item href={href} key={`pbi-${label}`}>
            {icon}
            <span>{label}</span>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default PageBreadcrumb
