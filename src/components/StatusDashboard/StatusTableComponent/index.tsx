import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { fieldStatusTable } from "../../../constants/Car";
import { CarStatusTable as StatusTable  } from "../../../interfaces/Car";
import StatusCircle from "../StatusCircle";
import { CarStatus as Status } from "../../../interfaces/Car";

const StatusTableComponent : React.FC<{ data: StatusTable[], statusFullSize: boolean, idSetter: any }> = ({data, statusFullSize, idSetter}) => {

  const columns : ColumnsType<StatusTable> =[
      {
        title: fieldStatusTable["id"],
        dataIndex: "id",
        key: "id",
        ellipsis: true,
        width: statusFullSize ? "75%": "0%",
        sorter: (a, b) => a.id.localeCompare(b.id),
        //filterSearch: true, Did not work
        //onFilter: (value, record) => record.id.indexOf(value.toString()) === 0, Did not work
        render: (id) => <div style={{cursor:"pointer"}}>{id}</div>,
      },
      {
        dataIndex: "status",
        key: "status",
        ellipsis: true,
        width: statusFullSize ? "25%" : "0%",
        filters: [
          {
            text: Status.ACTIVE,
            value: Status.ACTIVE,
          },
          {
            text: Status.INACTIVE,
            value: Status.INACTIVE,
          },
        ],
        defaultFilteredValue : [Status.ACTIVE],
        onFilter: (value, record) => record.status.indexOf(value.toString()) === 0,
        render: (status) => 
        <div style = {{cursor:"pointer", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
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
            onClick: () => { idSetter(record.id) }
          };
        }}
        pagination={false}
      />
  )
}

export default StatusTableComponent;