import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import './LoginLogout.scss'

const fetcher = async (path: string) => {
  const response = await axios.get(path)
  return response.data
}

// LoginLogout
interface LoginLogoutProps {}

const LoginLogout = (props: LoginLogoutProps) => {
  const { data, error } = useSWR('/api/currentuser', fetcher)

  let child
  if (!data && !error) {
    child = <>Please wait...</>
  } else if (error?.response?.status === 401) {
    child = <Login />
  } else {
    child = <Logout username={data?.username} />
  }

  return <div className="login-logout">{child}</div>
}

export default LoginLogout

// Login
interface LoginProps {}

interface LoginForm {
  username: string
  password: string
}

const postLogin = (data: LoginForm) =>
  axios.post('/api/login', {
    username: data.username,
    password: data.password,
    role: 'ADMIN',
  })

const Login = (props: LoginProps) => {
  const { mutate } = useSWRConfig()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const handleLogin = async (data: LoginForm) => {
    try {
      const response = await postLogin(data)
      mutate('/api/currentuser')
    } catch (error: any) {
      if (error?.response?.status === 400) {
        alert('Wrong username or password')
      }
    }
  }
  return (
    <form className="form-login" onSubmit={handleSubmit(handleLogin)}>
      <label className="form-login--label-username">Username:</label>
      <input
        className="form-login--input-username"
        type="text"
        {...register('username')}
      />
      <label className="form-login--input-password">Password:</label>
      <input
        className="form-login--input-password"
        type="password"
        {...register('password')}
      />
      <button className="form-login--btn-submit" type="submit">
        Login
      </button>
    </form>
  )
}

//Logout
interface LogoutProps {
  username: string
}

const postLogout = () => axios.post('/api/logout')

const Logout = (props: LogoutProps) => {
  const { mutate } = useSWRConfig()
  const handleLogout = async () => {
    const response = await postLogout()
    mutate('/api/currentuser')
  }
  return (
    <div className="logout">
      <span className="logout--username">{props.username}</span>
      <button className="logout--btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
