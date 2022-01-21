import { ReactNode } from 'react'
import LayoutNavbar from './LayoutNavbar'

interface Props {
  children: ReactNode
}
const Layout = (props: Props) => {
  return (
    <div className="layout">
      <LayoutNavbar />
      {props.children}
    </div>
  )
}

export default Layout
