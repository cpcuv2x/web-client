import { ReloadOutlined } from "@ant-design/icons"
import { Button, Col, Row, Space, Table, Tag, Tooltip, Typography } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/lib/table"
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface"
import React, { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useCameras from "../../hooks/useCameras"
import useCamerasFilters from "../../hooks/useCamerasFilters"
import { Camera, CameraStatus, OrderDir } from "../../interfaces/Camera"
import { routes } from "../../routes/constant"
import handleError from "../../utils/handleError"
import CopyToClipboardButton from "../CopyToClipboardButton"
import DeleteCameraButton from "../DeleteCameraButton"
import EditCameraButton from "../EditCameraButton"

const CamerasTable: React.FC = () => {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { filtersObj } = useCamerasFilters()
  const { cameras, count, loading, mutate, error } = useCameras(filtersObj)

  useEffect(() => {
    if (error) {
      handleError(error, "Could not get cameras")
    }
  }, [error])

  function handleChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Camera> | SorterResult<Camera>[],
    extra: TableCurrentDataSource<Camera>
  ) {
    const newParams = new URLSearchParams(params)

    const orderByKey = (sorter as SorterResult<Camera>).column?.key
    if (orderByKey) {
      newParams.set("orderBy", orderByKey as string)
    } else {
      newParams.delete("orderBy")
    }

    const orderDir = (sorter as SorterResult<Camera>).order
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

  const columns: ColumnsType<Camera> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      render: (id) => (
        <Row justify="space-between" gutter={8}>
          <Col style={{ maxWidth: 200 }}>
            <Typography.Text ellipsis>{id}</Typography.Text>
          </Col>
          <Col>
            <CopyToClipboardButton text={id} />
          </Col>
        </Row>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: true,
    },
    {
      title: "Stream URL",
      dataIndex: "streamUrl",
      key: "streamUrl",
      sorter: true,
    },
    {
      title: "Position",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => {
        const color = status === CameraStatus.ACTIVE ? "success" : "red"
        const label = status === CameraStatus.ACTIVE ? "Active" : "Inactive"

        return (
          <Tag key={status} color={color}>
            {label}
          </Tag>
        )
      },
    },
    {
      title: "Attached To",
      dataIndex: "Car",
      key: "carId",
      sorter: true,
      render: (car) => {
        return car ? (
          <div style={{ maxWidth: 150 }}>
            <Typography.Link
              onClick={() => {
                navigate(`${routes.DASHBOARD_CAR}/${car.id}`)
              }}
              ellipsis
            >
              {car.licensePlate}
            </Typography.Link>
          </div>
        ) : (
          "-"
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
            <EditCameraButton cameraId={id} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteCameraButton cameraId={id} onFinished={reload} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Table
      dataSource={cameras}
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

export default CamerasTable
