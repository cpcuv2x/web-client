import {
  PieChartOutlined,
  ReloadOutlined,
  ZoomInOutlined,
} from "@ant-design/icons"
import { Button, Col, Image, Row, Space, Table, Tag, Typography } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/lib/table"
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface"
import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import appConfig from "../../configuration"
import { fieldLabel } from "../../constants/Car"
import useCars from "../../hooks/useCars"
import useCarsFilters from "../../hooks/useCarsFilters"
import { Camera, CameraStatus } from "../../interfaces/Camera"
import { Car, CarStatus, OrderDir } from "../../interfaces/Car"
import { Driver } from "../../interfaces/Driver"
import { routes } from "../../routes/constant"
import handleError from "../../utils/handleError"
import DeleteCarButton from "../DeleteCarButton"
import EditCarButton from "../EditCarButton"
import IDColumn from "../IDColumn"

const CarsTable: React.FC = () => {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { filtersObj } = useCarsFilters()
  const { cars, count, loading, mutate, error } = useCars(filtersObj)

  useEffect(() => {
    if (error) {
      handleError(error, "Could not get cars")
    }
  }, [error])

  const [visible, setVisible] = useState(false)
  const [imgCarId, setImgCarId] = useState("")

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
      title: fieldLabel["id"],
      dataIndex: "id",
      key: "id",
      sorter: true,
      ellipsis: true,
      render: (id) => <IDColumn id={id} />,
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
                  src: `${appConfig.webServicesURL}api/cars/${record.id}/image`,
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
      title: fieldLabel["licensePlate"],
      dataIndex: "licensePlate",
      key: "licensePlate",
      sorter: true,
    },
    {
      title: fieldLabel["model"],
      dataIndex: "model",
      key: "model",
      sorter: true,
    },
    // {
    //   title: fieldLabel["passengers"],
    //   dataIndex: "passengers",
    //   key: "passengers",
    //   sorter: true,
    // },
    {
      title: fieldLabel["status"],
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => {
        const color = status === CarStatus.ACTIVE ? "success" : "red"
        const label = status === CarStatus.ACTIVE ? "Active" : "Inactive"

        return (
          <Tag key={status} color={color}>
            {label}
          </Tag>
        )
      },
    },
    {
      title: fieldLabel["cameras"],
      dataIndex: "Camera",
      key: "id",
      render: (cameras: Camera[]) =>
        cameras.length
          ? cameras.map(({ id, name, status }) => {
              const color = status === CameraStatus.ACTIVE ? "success" : "red"
              return (
                <Tag key={id} color={color}>
                  {name}
                </Tag>
              )
            })
          : "-",
    },
    {
      title: fieldLabel["Driver"],
      dataIndex: "Driver",
      key: "driverId",
      sorter: true,
      render: (driver: Driver) =>
        driver ? (
          <div style={{ maxWidth: 150 }}>
            <Typography.Link
              onClick={() => {
                navigate(`${routes.ENTITY_DRIVER}?id=${driver?.id}`)
              }}
              ellipsis
            >
              {driver?.firstNameTH} ({driver?.id})
            </Typography.Link>
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space>
          <EditCarButton carId={id} />
          <DeleteCarButton carId={id} onFinished={reload} />
          <Button
            onClick={() => {
              navigate(`${routes.DASHBOARD_CAR}/${id}`)
            }}
            icon={<PieChartOutlined />}
          />
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

export default CarsTable
