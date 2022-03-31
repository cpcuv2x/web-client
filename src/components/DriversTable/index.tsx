import { ReloadOutlined, ZoomInOutlined } from "@ant-design/icons"
import { Button, Image, Space, Table, Tooltip } from "antd"
import moment from "moment"
import { useState } from "react"
import useDrivers from "../../hooks/useDrivers"
import DeleteDriverButton from "../DeleteDriverButton"
import EditDriverButton from "../EditDriverButton"

const { Column } = Table

const DriversTable: React.FC = () => {
  // FIXME: useFilter
  const filtersObject = {}
  // FIXME: change offset and limit
  const { drivers, count, loading, mutate } = useDrivers(filtersObject, 100, 0)

  const [visibleImgPreview, setVisibleImgPreview] = useState(false)
  const [previewImgFilename, setPreviewImgFilename] = useState("")

  return (
    <Table
      rowKey="id"
      dataSource={drivers}
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
          if (!imageFilename) return "None"
          return (
            <>
              <Button
                type="link"
                icon={<ZoomInOutlined />}
                onClick={() => {
                  setPreviewImgFilename(imageFilename)
                  setVisibleImgPreview(true)
                }}
              >
                view
              </Button>
              {visibleImgPreview && (
                <Image
                  preview={{
                    visible:
                      imageFilename === previewImgFilename && visibleImgPreview,
                    src: `/api/drivers/images/${imageFilename}`,
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
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
      <Column
        title="Birth Date"
        dataIndex="birthDate"
        key="birthDate"
        render={(isoString) => {
          return moment(isoString).format("DD/MM/YYYY")
        }}
      />
      <Column title="National ID" dataIndex="nationalId" key="nationalId" />
      <Column
        title="Car Driving License No."
        dataIndex="carDrivingLicenseId"
        key="carDrivingLicenseId"
      />
      <Column
        title="Action"
        key="action"
        dataIndex="id"
        render={(id) => (
          <Space>
            <Tooltip title="Edit">
              <EditDriverButton driverId={id} />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteDriverButton driverId={id} onFinished={() => mutate()} />
            </Tooltip>
          </Space>
        )}
      />
    </Table>
  )
}

export default DriversTable
