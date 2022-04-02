import { message } from "antd"
import axios, { AxiosError } from "axios"

const handleError = (err: unknown, errMsg = "Some thing went wrong") => {
  let msg: string
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<string>
    msg = axiosError.response?.data ?? errMsg
  } else {
    msg = (err as Error).message
  }

  message.error(msg)
}

export default handleError
