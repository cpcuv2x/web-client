import { Link, Outlet } from 'react-router-dom'

const AppLayout = () => (
  <div>
    <div>
      <Link to="/dashboards">dashboards</Link>
      <Link to="/">login</Link>
    </div>
    <Outlet />
  </div>
)

export default AppLayout
