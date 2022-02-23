import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

const AppBreadcrumb = () => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbItems = pathSnippets.map((path) => (
    <Breadcrumb.Item key={path}>
      {path.charAt(0).toUpperCase() + path.slice(1)}
    </Breadcrumb.Item>
  ))
  return <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
}

export default AppBreadcrumb
