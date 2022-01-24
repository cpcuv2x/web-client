import useSWR from 'swr'

const useUser = () => {
  const { data, error } = useSWR('/api/currentuser')

  return {
    user: data,
    loading: !error && !data,
    error: error?.response?.data,
  }
}

export default useUser
