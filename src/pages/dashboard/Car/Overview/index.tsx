import { AreaChartOutlined, CarOutlined, DownOutlined, ReloadOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Col, Dropdown, List, Menu, Row, Typography, Table } from "antd"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import PageBreadcrumb from "../../../../components/PageBreadcrumb"
import useCars from "../../../../hooks/useCars"
import { routes } from "../../../../routes/constant"

import { ColumnsType } from "antd/lib/table"
import { CarStatus, CarStatusTable } from "../../../../interfaces/Car"
import { fieldStatusTable } from "./../../../../constants/Car"
import StatusCircle from "../../../../components/statusCircle"

const DashboardOverviewPage: React.FC = () => {
  const { cars } = useCars()
  console.log(cars)

  const menu = (
    <Menu>
      {cars.map(({ id, licensePlate }) => (
        <Menu.Item key={id}>
          <Link to={id}>
            {licensePlate} ({id})
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  const mockupData = [
    {
      "id":"V0001",
      "status": CarStatus.ACTIVE
    },
    {
      "id":"V0002",
      "status": CarStatus.INACTIVE
    },
    {
      "id":"V0003",
      "status": CarStatus.ACTIVE
    }
  ]

  const columns : ColumnsType<CarStatusTable> =[
    {
      title: fieldStatusTable["id"],
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      width: "75%",
      render: (id) => <div>{id}</div>,
    },
    {
      title: fieldStatusTable["status"],
      dataIndex: "status",
      key: "status",
      sorter: true,
      ellipsis: true,
      width: "25%",
      render: (status) => <StatusCircle status={status}/>,
    }
  ]

  return (
    <>
      <Helmet>
        <title>Cars - Dashboard | 5G-V2X</title>
      </Helmet>

      <PageBreadcrumb
        items={[
          {
            label: "Dashboard",
            icon: <AreaChartOutlined />,
            href: routes.DASHBOARD_OVERVIEW,
          },
          {
            label: "Car",
            icon: <CarOutlined />,
            href: routes.DASHBOARD_CAR,
          },
        ]}
      />

      <Typography.Title>Cars Dashboard</Typography.Title>
      <Row>
        <Col span = {5}>
        <Table
          dataSource={mockupData}
          columns={columns}
          rowKey="id"
          loading={false}
          tableLayout="fixed"
          onRow={(record, _) => {
            return {
              onClick: () => { record.status = record.status === CarStatus.ACTIVE ? CarStatus.INACTIVE:CarStatus.ACTIVE },
            };
          }}
          shouldCellUpdate={() => true}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Typography.Text>Total: {0} item(s)</Typography.Text>
              </Col>
              <Col>
                <Button onClick={()=>{}} icon={<ReloadOutlined />}/>
              </Col>
            </Row>
          )}
        pagination={false}
      />
        </Col>
        <Col span = {19}>
          <Card size="small">Card content</Card>
        </Col>
      </Row>
    </>
  )

  /*
  <Dropdown overlay={menu} trigger={["click"]}>
    <Button>
      Select a car <DownOutlined />
    </Button>
  </Dropdown>
  */
}

export default DashboardOverviewPage
