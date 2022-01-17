//Login-Logout โง่ๆ เหมือนโง่ที่ไม่รู้ว่าเธอไม่ได้มีใจ

import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'

// LoginLogout
interface LoginLogoutProps {}

const fetchCurrentUser = async () => {
  const response = await axios.get('/currentuser')
  return response.data
}

const LoginLogout = (props: LoginLogoutProps) => {
  const { data, error } = useSWR('/currentuser', fetchCurrentUser)
  if (!data && !error) {
    return <Box>รอแปปไอสัส</Box>
  }
  if (error?.response?.status === 401) {
    return (
      <Box>
        <Login />
      </Box>
    )
  } else {
    return (
      <Box>
        <Logout />
      </Box>
    )
  }
}

export default LoginLogout

// Login
interface LoginProps {}

interface LoginForm {
  username: string
  password: string
}

const postLogin = (data: LoginForm) =>
  axios.post('/login', {
    username: data.username,
    password: data.password,
    role: 'ADMIN',
  })

const Login = (props: LoginProps) => {
  const { mutate } = useSWRConfig()
  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const handleLogin = async (data: LoginForm) => {
    try {
      const response = await postLogin(data)
      mutate('/currentuser')
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setError('username', {})
        setError('password', {})
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { invalid } }) => (
          <TextField label="Username" {...field} error={invalid} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            type="password"
            label="Password"
            {...field}
            error={invalid}
          />
        )}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  )
}

//Logout
interface LogoutProps {}

const postLogout = () => axios.post('/logout')

const Logout = (props: LogoutProps) => {
  const { mutate } = useSWRConfig()
  const handleLogout = async () => {
    const response = await postLogout()
    mutate('/currentuser')
  }
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  )
}
