import { Tooltip } from "antd"
import React from "react"
import CopyToClipboardButton from "../CopyToClipboardButton"

interface Props {
  id: string
}

const IDColumn: React.FC<Props> = ({ id }) => {
  return (
    <>
      <CopyToClipboardButton text={id} />
      <Tooltip title={id}>
        <span style={{ marginLeft: 8 }}>{id}</span>
      </Tooltip>
    </>
  )
}

export default IDColumn
