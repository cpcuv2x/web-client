import useSWR from "swr"

const useUser = () => {
  const { data, mutate, error } = useSWR("/api/auth/currentuser")

  const loading = !data && !error
  const loggedOut = error && error.status === 401

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  }
}

export default useUser
