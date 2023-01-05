import { AreaChartOutlined, CarOutlined } from "@ant-design/icons"
import { Card, Col, Row, Select, SelectProps, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import DashboardCarComponent from "../../../../components/StatusDashboard/CarDashBoard"
import StatusTableComponent from "../../../../components/StatusDashboard/StatusTableComponent"
import CameraStreams from "../../../../components/widgets/CameraStreams"
import CarInformation from "../../../../components/widgets/car/CarInformation"
import useCar from "../../../../hooks/useCar"
import useCarsStatus from "../../../../hooks/useCarsStatus"
import { routes } from "../../../../routes/constant"

const DashboardAllCarPage: React.FC = () => {
  // wait for cars to be loaded

  const [statusFullSize, setStatusFullSize] = useState<boolean>(true)
  const [selectedCar, setSelectedCar] = useState<string[]>([
    "V0001",
    "V0002",
    "V0003",
  ])
  const [loading, setLoading] = useState(true)

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`)
    // setSelectedCar and update the selectedCar with sorted selectedCar
    setSelectedCar(value)
    setSelectedCar((data) => {
      const dataToSort = [...data]
      const sortedData = dataToSort.sort((a, b) => {
        if (a < b) {
          return -1
        }
        if (a > b) {
          return 1
        }
        return 0
      })
      return sortedData
    })

    // setSelectedCar((data) => {
    //   const dataToSort = [...data, value]
    //   const sortedData = dataToSort.sort((a, b) => {
    //     if (a < b) {
    //       return -1
    //     }
    //     if (a > b) {
    //       return 1
    //     }
    //     return 0
    //   })
    //   return sortedData
    // })

    console.log(selectedCar)
  }
  const { cars } = useCarsStatus()
  useEffect(() => {
    if (cars.length > 0) {
      setLoading(false)
    }
  }, [cars])

  if (cars === undefined) return <div>Loading...</div>

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Helmet>
        <title>All Cars - Dashboard | 5G-V2X1234</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Vehicle",
            icon: <CarOutlined />,
            href: routes.DASHBOARD_CAR,
          },
          {
            label: "V0001",
          },
        ]}
      />

      <Typography.Title>All Vehicles</Typography.Title>
      <Col span={11}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={["V0001", "V0002", "V0003"]}
          onChange={handleChange}
          options={[
            {
              value: "V0001",
              label: "V0001",
            },
            {
              value: "V0002",
              label: "V0002",
            },
            {
              value: "V0003",
              label: "V0003",
            },
          ]}
        />
        <br />
      </Col>
      {/* <Row>
        <Col span={24}>
          <Card size="small">
            <DashboardCarComponent
              carId={"V0001"}
              setStatusFullsize={setStatusFullSize}
              statusFullSize={statusFullSize}
            />
          </Card>
        </Col>
      </Row> */}

      {selectedCar?.length === 1 && (
        <Row gutter={[16, 16]}>
          {selectedCar.map((carId) => (
            <Col flex={2} key={carId}>
              <CameraStreams carId={carId} />
            </Col>
          ))}
        </Row>
      )}
      <Row gutter={[1, 5]}>
        {selectedCar?.length === 3 &&
          selectedCar.map((carId) => (
            <Col span={24} key={carId}>
              <CameraStreams carId={carId} fullSize />
            </Col>
          ))}
      </Row>

      {selectedCar?.length === 2 && (
        <Row gutter={[1, 16]}>
          {selectedCar.map((carId) => (
            <Col span={12} key={carId}>
              <CameraStreams carId={carId} fullSize />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default DashboardAllCarPage
