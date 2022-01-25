import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Controller, useForm } from 'react-hook-form'

import { Dashboard } from '../interfaces/Dashboard'
import { UpdateDashboardPayload } from '../interfaces/UpdateDashboardPayload'

interface Props {
  onSubmit: (id: string, data: UpdateDashboardPayload) => any
}

export interface DashboardModalEditRef {
  doShow: (dashboard: Dashboard) => void
  doClose: () => void
}

const DashboardModalEdit = (
  props: Props,
  ref: React.ForwardedRef<DashboardModalEditRef>
) => {
  const [show, setShow] = useState(false)
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const { control, handleSubmit, setValue } = useForm<UpdateDashboardPayload>({
    defaultValues: {
      name: '',
      default: false,
    },
  })
  useImperativeHandle(ref, () => ({
    doShow,
    doClose,
  }))

  const doShow = (dashboard: Dashboard) => {
    setValue('name', dashboard.name)
    setValue('default', dashboard.default)
    setDashboard(dashboard)
    setShow(true)
  }
  const doClose = () => {
    setShow(false)
  }
  const doSubmit = (data: UpdateDashboardPayload) => {
    if (dashboard) {
      props.onSubmit(dashboard._id, data)
    }
  }

  return (
    <Modal show={show} onHide={doClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Dashboard</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(doSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Dashboard Name</Form.Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Form.Control type="text" placeholder="Untitled-1" {...field} />
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Controller
              control={control}
              name="default"
              render={({ field }) => {
                const { value, ...otherFields } = field
                return (
                  <Form.Check
                    type="checkbox"
                    label="Mark this dashboard as a default"
                    checked={value}
                    {...otherFields}
                  />
                )
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={doClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default forwardRef(DashboardModalEdit)
