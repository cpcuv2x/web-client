import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { fieldStatusTable } from "../../../constants/Car";
import { StatusTableElement  } from "../../../interfaces/Status";
import StatusCircle from "../StatusCircle";
import { CarStatus as Status } from "../../../interfaces/Car";
import { useNavigate } from "react-router-dom";

const StatusTableComponent : React.FC<{ data: StatusTableElement[], statusFullSize: boolean, route : string}> 
= ({data, statusFullSize, route}) => {

  const navigate = useNavigate();

  const columns : ColumnsType<StatusTableElement> =[
      {
        title: fieldStatusTable["id"],
        dataIndex: "id",
        key: "id",
        ellipsis: true,
        width: statusFullSize ? "75%": "0%",
        sorter: (a, b) => a.id.localeCompare(b.id),
        defaultSortOrder: "ascend",
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
      pagination={false}
      sticky={true}
      tableLayout="fixed"
      scroll={{ y: 240 }}
      size="small"
      onRow={(record, _) => {
        return {
          onClick: () => { navigate(`${route}/${record.id}`); }
        };
      }}
    />
  )
}

export default StatusTableComponent;