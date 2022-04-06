import { ReloadOutlined, ZoomInOutlined } from "@ant-design/icons"
import {
  Button,
  Col,
  Image,
  Row,
  Space,
  Table,
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
import { useSearchParams } from "react-router-dom"
import appConfig from "../../configuration"
import useDrivers from "../../hooks/useDrivers"
import useDriversFilters from "../../hooks/useDriversFilters"
import { Driver, OrderDir } from "../../interfaces/Driver"
import handleError from "../../utils/handleError"
import CopyToClipboardButton from "../CopyToClipboardButton"
import DeleteDriverButton from "../DeleteDriverButton"
import EditDriverButton from "../EditDriverButton"

const DriversTable: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { filtersObj } = useDriversFilters()
  const { drivers, count, loading, mutate, error } = useDrivers(filtersObj)

  useEffect(() => {
    if (error) {
      handleError(error, "Could not get drivers")
    }
  }, [error])

  const [visible, setVisible] = useState(false)
  const [imgFileName, setImgFileName] = useState("")

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
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      render: (id) => (
        <Row justify="space-between" gutter={8}>
          <Col style={{ maxWidth: 100 }}>
            <Typography.Text ellipsis>{id}</Typography.Text>
          </Col>
          <Col>
            <CopyToClipboardButton text={id} />
          </Col>
        </Row>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageFilename",
      key: "imageFilename",
      sorter: true,
      render: (fileName) =>
        fileName ? (
          <>
            <Button
              type="link"
              icon={<ZoomInOutlined />}
              style={{ padding: 0 }}
              onClick={() => {
                setImgFileName(fileName)
                setVisible(true)
              }}
            >
              view
            </Button>
            {visible && (
              <Image
                preview={{
                  visible: fileName === imgFileName,
                  src: `${appConfig.webServicesURL}api/drivers/images/${fileName}`,
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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      sorter: true,
      render: (isoString) => moment(isoString).format("DD/MM/YYYY"),
    },
    {
      title: "National ID",
      dataIndex: "nationalId",
      key: "nationalId",
      sorter: true,
    },
    {
      title: "Car Driving License No.",
      dataIndex: "carDrivingLicenseId",
      key: "carDrivingLicenseId",
      sorter: true,
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space>
          <Tooltip title="Edit">
            <EditDriverButton driverId={id} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteDriverButton driverId={id} onFinished={reload} />
          </Tooltip>
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
