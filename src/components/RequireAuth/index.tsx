import { Navigate, useLocation } from "react-router-dom"
import useUser from "../../hooks/useUser"

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useUser()
  const location = useLocation()

  if (loading) {
    return <div>Redirecting...</div>
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
