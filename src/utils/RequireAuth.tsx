import Spinner from 'react-bootstrap/Spinner'
import { Navigate, useLocation } from 'react-router-dom'
import useUser from '../hooks/useUser'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useUser()
  const location = useLocation()

  if (loading) {
    return <Spinner animation="border" />
  }

  if (!user && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
