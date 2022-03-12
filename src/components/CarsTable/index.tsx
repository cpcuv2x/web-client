import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  ZoomInOutlined,
} from "@ant-design/icons"
import { Button, Image, Space, Table, Tag, Tooltip } from "antd"
import React, { useState } from "react"
import useCarFilters from "../../hooks/useCarFilters"
import useCars from "../../hooks/useCars"

const { Column } = Table

const CarsTable: React.FC = () => {
  const { filtersObject } = useCarFilters()
  const { cars, count, loading, mutate } = useCars(filtersObject, 100, 0)

  const [visibleImgPreview, setVisibleImgPreview] = useState(false)

  return (
    <Table
      rowKey="id"
      dataSource={cars}
      loading={loading}
      pagination={{
        position: ["topRight"],
        showTotal: () => (
          <Space>
            <span>Total {count} item(s)</span>
            <Button onClick={() => mutate()} icon={<ReloadOutlined />} />
          </Space>
        ),
      }}
    >
      <Column title="ID" dataIndex="id" key="id" ellipsis />
      <Column
        title="Image"
        dataIndex="imageFilename"
        key="imageFilename"
        render={(imageFilename) => {
          return (
            <>
              <Button
                type="link"
                icon={<ZoomInOutlined />}
                onClick={() => setVisibleImgPreview(true)}
              >
                view
              </Button>
              {visibleImgPreview && (
                <Image
                  preview={{
                    visible: visibleImgPreview,
                    src: `/api/cars/images/${imageFilename}`,
                    onVisibleChange: (value) => {
                      setVisibleImgPreview(value)
                    },
                  }}
                />
              )}
            </>
          )
        }}
      />
      <Column
        title="License Plate"
        dataIndex="licensePlate"
        key="licensePlate"
      />
      <Column title="Model" dataIndex="model" key="model" />
      <Column title="Passenger (s)" dataIndex="passengers" key="passengers" />
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(status) => {
          const color = status === "ACTIVE" ? "success" : "red"
          const label = status === "ACTIVE" ? "Active" : "Inactive"

          return (
            <Tag key={status} color={color}>
              {label}
            </Tag>
          )
        }}
      />
      <Column
        title="Action"
        key="action"
        render={() => (
          <Space>
            <Tooltip title="Edit">
              <Button icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Delete">
              <Button icon={<DeleteOutlined />} />
            </Tooltip>
          </Space>
        )}
      />
    </Table>
  )
}

export default CarsTable
