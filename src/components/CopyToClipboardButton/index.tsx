import { CopyOutlined } from "@ant-design/icons"
import { Button, message } from "antd"
import React from "react"

interface Props {
  text: string
}

const CopyToClipboardButton: React.FC<Props> = ({ text }) => {
  function onClick() {
    navigator.clipboard.writeText(text)
    message.success("Copied!")
  }
  return <Button icon={<CopyOutlined />} onClick={onClick} />
}

export default CopyToClipboardButton
