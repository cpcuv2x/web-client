import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import ReactJson from 'react-json-view'

import { LayoutWithDashboardItem } from '../interfaces/LayoutWithDashboard'

interface Props {
  card: LayoutWithDashboardItem
  deleteItem: (...args: any) => void
}

const DashboardCard = (props: Props) => {
  const [showButton, setShowButton] = useState(false)

  return (
    <Card
      className="dashboard-card"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Card.Body className="dashboard-card__body">
        <ReactJson src={props.card} />
      </Card.Body>
      {showButton && (
        <Button
          variant="light"
          className="dashboard-card__btn-delete"
          onClick={() => props.deleteItem(props.card.i)}
        >
          <FaTrash />
        </Button>
      )}
    </Card>
  )
}

export default DashboardCard
