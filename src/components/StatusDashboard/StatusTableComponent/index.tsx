import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { fieldStatusTable } from "../../../constants/Car";
import { CarStatusTable as StatusTable  } from "../../../interfaces/Car";
import StatusCircle from "../StatusCircle";
import { centerAbsolute } from "../CenterAbsolute";

const StatusTableComponent : React.FC<{ data: StatusTable[], statusFullSize: boolean, idSetter: any }> = ({data, statusFullSize, idSetter}) => {

  const columns : ColumnsType<StatusTable> =[
      {
        title: fieldStatusTable["id"],
        dataIndex: "id",
        key: "id",
        ellipsis: true,
        width: statusFullSize ? "75%": "0%",
        render: (id) => <div>{id}</div>,
      },
      {
        dataIndex: "status",
        key: "status",
        sorter: true,
        ellipsis: true,
        width: statusFullSize ? "25%" : "0%",
        render: (status) => 
        <div style = {centerAbsolute}>
          <StatusCircle status={status}/>
        </div>
      }
  ]

  return(
    <Table
        style={{width: "95%"}}
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={false}
        tableLayout="fixed"
        scroll={{ y: 240 }}
        sticky={true}
        onRow={(record, _) => {
          return {
            onClick: () => { idSetter(record.id) },
          };
        }}
        pagination={false}
      />
  )
}

export default StatusTableComponent;