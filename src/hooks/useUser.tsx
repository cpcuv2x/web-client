import useSWR from "swr"
import { User } from "../interfaces/User"

const useUser = () => {
  const { data, mutate, error } = useSWR<User>("/api/auth/currentuser")

  const loading = !data && !error
  const loggedOut = !!(error && error.status === 401)

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  }
}

export default useUser
