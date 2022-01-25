import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

import { Dashboard } from '../interfaces/Dashboard'

interface Props {
  dashboard: Dashboard
  selectedDashboardId: string
  setSelectedDashboardId: React.Dispatch<React.SetStateAction<string>>
  onClickEdit: (...args: any) => any
  onClickDelete: (...args: any) => any
}

const DashboardListItem = (props: Props) => {
  const [showButtons, setShowButtons] = useState(false)

  return (
    <Card
      className={
        props.dashboard._id === props.selectedDashboardId
          ? 'dashboard-list-item--selected'
          : 'dashboard-list-item'
      }
      onClick={() => {
        props.setSelectedDashboardId(props.dashboard._id)
      }}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      key={props.dashboard._id}
    >
      <Card.Body>
        <Card.Text>
          {props.dashboard.name}{' '}
          {props.dashboard.default && <Badge bg="info">Default</Badge>}
        </Card.Text>
      </Card.Body>
      {showButtons && (
        <div className="dashboard-list-item__btn-group">
          <Button
            variant="light"
            className="btn-group__btn-edit"
            onClick={(e) => {
              e.stopPropagation()
              props.onClickEdit(props.dashboard)
            }}
          >
            <FaPencilAlt />
          </Button>
          <Button
            variant="light"
            className="btn-group--btn-delete"
            onClick={(e) => {
              e.stopPropagation()
              props.onClickDelete(props.dashboard)
            }}
          >
            <FaTrash />
          </Button>
        </div>
      )}
    </Card>
  )
}

export default DashboardListItem
