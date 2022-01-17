import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import LoginLogout from '../components/LoginLogout'

const Home: NextPage = () => {
  return (
    <Typography variant="h4" component="h1">
      Index page
      <LoginLogout />
    </Typography>
  )
}

export default Home
