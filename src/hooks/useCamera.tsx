import useSWR from "swr"
import { Camera } from "../interfaces/Camera"

const useCamera = (cameraId: string) => {
  const { data, mutate, error } = useSWR<Camera>(`/api/cameras/${cameraId}`)
  const loading = !data && !error

  return {
    camera: data,
    mutate,
    error,
    loading,
  }
}

export default useCamera
