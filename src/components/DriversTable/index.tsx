import {
  PieChartOutlined,
  ReloadOutlined,
  ZoomInOutlined,
} from "@ant-design/icons"
import {
  Button,
  Col,
  Image,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/lib/table"
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import appConfig from "../../configuration"
import { driverGenderLabel, fieldLabel } from "../../constants/Driver"
import useDrivers from "../../hooks/useDrivers"
import useDriversFilters from "../../hooks/useDriversFilters"
import { Car } from "../../interfaces/Car"
import {
  Driver,
  DriverGender,
  DriverStatus,
  OrderDir,
} from "../../interfaces/Driver"
import { User } from "../../interfaces/User"
import { routes } from "../../routes/constant"
import handleError from "../../utils/handleError"
import CopyToClipboardButton from "../CopyToClipboardButton"
import DeleteDriverButton from "../DeleteDriverButton"
import EditDriverButton from "../EditDriverButton"

const DriversTable: React.FC = () => {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { filtersObj } = useDriversFilters()
  const { drivers, count, loading, mutate, error } = useDrivers(filtersObj)

  useEffect(() => {
    if (error) {
      handleError(error, "Could not get drivers")
    }
  }, [error])

  const [visible, setVisible] = useState(false)
  const [imgCarId, setImgCarId] = useState("")

  function handleChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Driver> | SorterResult<Driver>[],
    extra: TableCurrentDataSource<Driver>
  ) {
    const newParams = new URLSearchParams(params)

    const orderByKey = (sorter as SorterResult<Driver>).column?.key
    if (orderByKey) {
      newParams.set("orderBy", orderByKey as string)
    } else {
      newParams.delete("orderBy")
    }

    const orderDir = (sorter as SorterResult<Driver>).order
    if (orderDir) {
      newParams.set(
        "orderDir",
        orderDir === "ascend" ? OrderDir.ASC : OrderDir.DESC
      )
    } else {
      newParams.delete("orderDir")
    }
    setParams(newParams)
  }

  function reload() {
    mutate()
  }

  const columns: ColumnsType<Driver> = [
    {
      title: fieldLabel["id"],
      dataIndex: "id",
      key: "id",
      sorter: true,
      ellipsis: true,
      render: (id) => (
        <Row justify="space-between" gutter={8} wrap={false}>
          <Col>
            <CopyToClipboardButton text={id} />
          </Col>
          <Col style={{ maxWidth: 100 }}>
            <Tooltip title={id}>
              <Typography.Text ellipsis>{id}</Typography.Text>
            </Tooltip>
          </Col>
        </Row>
      ),
    },
    {
      title: fieldLabel["image"],
      dataIndex: "imageFilename",
      key: "imageFilename",
      sorter: true,
      render: (imageFilename, record) =>
        imageFilename ? (
          <>
            <Button
              type="link"
              icon={<ZoomInOutlined />}
              style={{ padding: 0 }}
              onClick={() => {
                setImgCarId(record.id)
                setVisible(true)
              }}
            >
              view
            </Button>
            {visible && (
              <Image
                preview={{
                  visible: record.id === imgCarId,
                  src: `${appConfig.webServicesURL}api/drivers/${record.id}/image`,
                  onVisibleChange: (value) => {
                    setVisible(value)
                  },
                }}
              />
            )}
          </>
        ) : (
          "-"
        ),
    },
    {
      title: fieldLabel["firstNameTH"],
      dataIndex: "firstNameTH",
      key: "firstNameTH",
      sorter: true,
    },
    {
      title: fieldLabel["lastNameTH"],
      dataIndex: "lastNameTH",
      key: "lastNameTH",
      sorter: true,
    },
    {
      title: fieldLabel["firstNameEN"],
      dataIndex: "firstNameEN",
      key: "firstNameEN",
      sorter: true,
    },
    {
      title: fieldLabel["lastNameEN"],
      dataIndex: "lastNameEN",
      key: "lastNameEN",
      sorter: true,
    },
    {
      title: fieldLabel["gender"],
      dataIndex: "gender",
      key: "gender",
      sorter: true,
      render: (gender: DriverGender) => driverGenderLabel[gender],
    },
    {
      title: fieldLabel["birthDate"],
      dataIndex: "birthDate",
      key: "birthDate",
      sorter: true,
      render: (isoString) => moment(isoString).format("DD/MM/YYYY"),
    },
    {
      title: fieldLabel["registerDate"],
      dataIndex: "registerDate",
      key: "registerDate",
      sorter: true,
      render: (isoString) => moment(isoString).format("DD/MM/YYYY"),
    },
    {
      title: fieldLabel["nationalId"],
      dataIndex: "nationalId",
      key: "nationalId",
      sorter: true,
    },
    {
      title: fieldLabel["carDrivingLicenseId"],
      dataIndex: "carDrivingLicenseId",
      key: "carDrivingLicenseId",
      sorter: true,
    },
    {
      title: fieldLabel["username"],
      dataIndex: "User",
      key: "username",
      render: (user: User) => user.username,
    },
    {
      title: fieldLabel["status"],
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => {
        const color = status === DriverStatus.ACTIVE ? "success" : "red"
        const label = status === DriverStatus.ACTIVE ? "Active" : "Inactive"

        return (
          <Tag key={status} color={color}>
            {label}
          </Tag>
        )
      },
    },
    {
      title: "Now Driving",
      dataIndex: "Car",
      key: "car",
      render: (car: Car) =>
        car ? (
          <Typography.Link
            onClick={() => {
              navigate(`${routes.ENTITY_CAR}?id=${car?.id}`)
            }}
            ellipsis
          >
            {car?.licensePlate}
          </Typography.Link>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "action",
      fixed: "right",
      render: (id) => (
        <Space>
          <EditDriverButton driverId={id} />
          <DeleteDriverButton driverId={id} onFinished={reload} />

          <Button
            onClick={() => {
              navigate(`${routes.DASHBOARD_DRIVER}/${id}`)
            }}
            icon={<PieChartOutlined />}
          />
        </Space>
      ),
    },
  ]

  return (
    <Table
      dataSource={drivers}
      columns={columns}
      rowKey="id"
      loading={loading}
      onChange={handleChange}
      tableLayout="fixed"
      scroll={{ x: true }}
      title={() => (
        <Row justify="space-between">
          <Col>
            <Typography.Text>Total: {count} item(s)</Typography.Text>
          </Col>
          <Col>
            <Button onClick={reload} icon={<ReloadOutlined />}>
              Reload
            </Button>
          </Col>
        </Row>
      )}
      pagination={false}
    />
  )
}

export default DriversTable
