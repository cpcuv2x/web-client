import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Controller, useForm } from 'react-hook-form'

import { CreateDashboardPayload } from '../interfaces/CreateDashboardPayload'

interface Props {
  onSubmit: (data: CreateDashboardPayload) => any
}

export interface DashboardModalCreateRef {
  doShow: () => void
  doClose: () => void
}

const DashboardModalCreate = (
  props: Props,
  ref: React.ForwardedRef<DashboardModalCreateRef>
) => {
  const [show, setShow] = useState(false)
  const { control, handleSubmit, setValue } = useForm<CreateDashboardPayload>({
    defaultValues: {
      name: '',
      default: false,
    },
  })
  useImperativeHandle(ref, () => ({
    doShow,
    doClose,
  }))

  const doShow = () => {
    setValue('name', '')
    setValue('default', false)
    setShow(true)
  }
  const doClose = () => {
    setShow(false)
  }

  return (
    <Modal show={show} onHide={doClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Dashboard</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(props.onSubmit)}>
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
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default forwardRef(DashboardModalCreate)
