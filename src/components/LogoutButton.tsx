import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'

const LogoutButton = () => {
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()

  const logout = async () => {
    await axios.post('/api/logout')
    mutate('/api/currentuser', null)
    navigate('/login')
  }

  return <Button onClick={logout}>Logout</Button>
}

export default LogoutButton
