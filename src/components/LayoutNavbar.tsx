import { Link } from 'react-router-dom'
import LoginLogout from './LoginLogout'
import './LayoutNavbar.scss'

interface Props {}

const LayoutNavbar = (props: Props) => {
  return (
    <div className="layout-navbar clearfix">
      <div className="layout-navbar--link-group">
        <Link className="layout-navbar--link" to={'/map'}>
          Map
        </Link>
        <Link className="layout-navbar--link" to={'/cars'}>
          Cars
        </Link>
        <Link className="layout-navbar--link" to={'/drivers'}>
          Drivers
        </Link>
        <Link className="layout-navbar--link" to={'/dashboards'}>
          Dashboards
        </Link>
      </div>
      <LoginLogout />
    </div>
  )
}

export default LayoutNavbar
