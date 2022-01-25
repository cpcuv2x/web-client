import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { Dashboard } from '../interfaces/Dashboard'

interface Props {
  onConfirm: (id: string) => any
}

export interface DashboardModalDeleteRef {
  doShow: (dashboard: Dashboard) => void
  doClose: () => void
}

const DashboardModalDelete = (
  props: Props,
  ref: ForwardedRef<DashboardModalDeleteRef>
) => {
  const [show, setShow] = useState(false)
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  useImperativeHandle(ref, () => ({
    doShow,
    doClose,
  }))

  const doShow = (dashboard: Dashboard) => {
    setDashboard(dashboard)
    setShow(true)
  }
  const doClose = () => {
    setShow(false)
  }
  const doConfirm = () => {
    if (dashboard) {
      props.onConfirm(dashboard._id)
    }
  }

  return (
    <Modal show={show} onHide={doClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Dashboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure want to delete dashboard <b>{dashboard?.name}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={doClose}>
          Close
        </Button>
        <Button variant="danger" onClick={doConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default forwardRef(DashboardModalDelete)
