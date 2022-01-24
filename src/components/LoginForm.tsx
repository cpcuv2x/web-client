import axios from 'axios'
import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'

interface LoginForm {
  username: string
  password: string
}

const LoginForm: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/dashboards'

  const { mutate } = useSWRConfig()

  const onSubmit = async ({ username, password }: LoginForm) => {
    try {
      const { data } = await axios.post('/api/login', {
        username,
        password,
        role: 'ADMIN',
      })
      setError(null)
      mutate('/api/currentuser', data)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label className="h4">Username</Form.Label>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                type="text"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="h4">Password</Form.Label>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                type="password"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="mt-3" size="lg">
            Submit
          </Button>
        </div>
      </Form>
      {error && (
        <Alert className="mt-3" variant="danger">
          {error?.response?.data?.message}
        </Alert>
      )}
    </>
  )
}

export default LoginForm
