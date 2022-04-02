import { ReloadOutlined, ZoomInOutlined } from "@ant-design/icons"
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
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import appConfig from "../../configuration"
import useCars from "../../hooks/useCars"
import useCarsFilter from "../../hooks/useCarsFilters"
import { Car, OrderDir } from "../../interfaces/Car"
import handleError from "../../utils/handleError"
import CopyToClipboardButton from "../CopyToClipboardButton"
import DeleteCarButton from "../DeleteCarButton"
import EditCarButton from "../EditCarButton"

const CarsTable: React.FC = () => {
  const [params, setParams] = useSearchParams()
  const { filtersObj } = useCarsFilter()
  const { cars, count, loading, mutate, error } = useCars(filtersObj)

  useEffect(() => {
    if (error) {
      handleError(error, "Could not get cars")
    }
  }, [error])

  const [visible, setVisible] = useState(false)
  const [imgFileName, setImgFileName] = useState("")

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Car> | SorterResult<Car>[],
    extra: TableCurrentDataSource<Car>
  ) => {
    const newParams = new URLSearchParams(params)

    const orderByKey = (sorter as SorterResult<Car>).column?.key
    if (orderByKey) {
      newParams.set("orderBy", orderByKey as string)
    } else {
      newParams.delete("orderBy")
    }

    const orderDir = (sorter as SorterResult<Car>).order
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

  const columns: ColumnsType<Car> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      render: (id) => (
        <Row justify="space-between" gutter={8}>
          <Col>
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
                  src: `${appConfig.webServicesURL}api/cars/images/${fileName}`,
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
      title: "License Plate No.",
      dataIndex: "licensePlate",
      key: "licensePlate",
      sorter: true,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      sorter: true,
    },
    {
      title: "Passenger (s)",
      dataIndex: "passengers",
      key: "passengers",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => {
        const color = status === "ACTIVE" ? "success" : "red"
        const label = status === "ACTIVE" ? "Active" : "Inactive"

        return (
          <Tag key={status} color={color}>
            {label}
          </Tag>
        )
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space>
          <Tooltip title="Edit">
            <EditCarButton carId={id} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteCarButton carId={id} onFinished={reload} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Table
      dataSource={cars}
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

export default CarsTable
