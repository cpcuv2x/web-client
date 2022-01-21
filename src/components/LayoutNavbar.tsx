import { Link } from 'react-router-dom'
import LoginLogout from './LoginLogout'
import './LayoutNavbar.scss'

interface Props {}

const LayoutNavbar = (props: Props) => {
  return (
    <div className="navbar clearfix">
      <div className="navbar--link-group">
        <Link className="navbar--link" to={'/map'}>
          Map
        </Link>
        <Link className="navbar--link" to={'/cars'}>
          Cars
        </Link>
        <Link className="navbar--link" to={'/drivers'}>
          Drivers
        </Link>
        <Link className="navbar--link" to={'/dashboards'}>
          Dashboards
        </Link>
      </div>
      <LoginLogout />
    </div>
  )
}

export default LayoutNavbar
