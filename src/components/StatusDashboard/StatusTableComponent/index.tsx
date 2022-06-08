import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { fieldStatusTable } from "../../../constants/Car";
import { CarStatusTable as StatusTable  } from "../../../interfaces/Car";
import StatusCircle from "../StatusCircle";


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
        title: fieldStatusTable["status"],
        dataIndex: "status",
        key: "status",
        sorter: true,
        ellipsis: true,
        width: statusFullSize ? "25%" : "100%",
        render: (status) => <StatusCircle status={status}/>,
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
        onRow={(record, _) => {
          return {
            onClick: () => { idSetter(record.id) },
          };
        }}
        title={() => (
          <Row justify="space-between">
            <Col>
              {statusFullSize&&<Typography.Text>Total: {data.length} item(s)</Typography.Text>}
            </Col>
            <Col>
              <Button onClick={()=>{}} icon={<ReloadOutlined />}/>
            </Col>
          </Row>
        )}
        pagination={false}
      />
  )
}

export default StatusTableComponent;