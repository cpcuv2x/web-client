import { message } from "antd"
import axios, { AxiosError } from "axios"

const handleError = (err: unknown) => {
  let msg: string
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<string>
    msg = axiosError.response?.data ?? "Some thing went wrong"
  } else {
    msg = (err as Error).message
  }

  message.error(msg)
}

export default handleError
