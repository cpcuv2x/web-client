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
import { cameraPositionLabel, fieldLabel } from "../../constants/Camera"
import useCameras from "../../hooks/useCameras"
import useCamerasFilters from "../../hooks/useCamerasFilters"
import {
  Camera,
  CameraRole,
  CameraStatus,
  OrderDir,
} from "../../interfaces/Camera"
import { routes } from "../../routes/constant"
import handleError from "../../utils/handleError"
import DeleteCameraButton from "../DeleteCameraButton"
import EditCameraButton from "../EditCameraButton"
import IDColumn from "../IDColumn"

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
      title: fieldLabel["id"],
      dataIndex: "id",
      key: "id",
      sorter: true,
      ellipsis: true,
      render: (id) => <IDColumn id={id} />,
    },
    {
      title: fieldLabel["name"],
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: fieldLabel["description"],
      dataIndex: "description",
      key: "description",
      sorter: true,
    },
    // {
    //   title: fieldLabel["streamUrl"],
    //   dataIndex: "streamUrl",
    //   key: "streamUrl",
    //   sorter: true,
    // },
    {
      title: fieldLabel["role"],
      dataIndex: "role",
      key: "role",
      sorter: true,
      render: (role: CameraRole) => cameraPositionLabel[role],
    },
    {
      title: fieldLabel["status"],
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
      title: fieldLabel["carId"],
      dataIndex: "Car",
      key: "carId",
      sorter: true,
      render: (car) => {
        return car ? (
          <Typography.Link
            onClick={() => {
              navigate(`${routes.ENTITY_CAR}?id=${car.id}`)
            }}
            ellipsis
          >
            {car.licensePlate}
          </Typography.Link>
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
          <EditCameraButton cameraId={id} />
          <DeleteCameraButton cameraId={id} onFinished={reload} />
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
      tableLayout="fixed"
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
