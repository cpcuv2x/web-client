import React, { useEffect, useRef } from 'react'
import useDashboards from '../hooks/useDashboards'
import Button from 'react-bootstrap/Button'
import DashboardListItem from './DashboardListItem'
import DashboardModalCreate, {
  DashboardModalCreateRef,
} from './DashboardModalCreate'
import DashboardModalDelete, {
  DashboardModalDeleteRef,
} from './DashboardModalDelete'
import DashboardModalEdit, { DashboardModalEditRef } from './DashboardModalEdit'
interface Props {
  selectedDashboardId: string
  setSelectedDashboardId: React.Dispatch<React.SetStateAction<string>>
}

const DashboardList = (props: Props) => {
  const {
    dashboards,
    loading,
    error,
    createDashboard,
    updateDashboard,
    deleteDashboard,
  } = useDashboards()

  useEffect(() => {
    if (dashboards && !props.selectedDashboardId) {
      const defaultDashboardId = dashboards.find(
        (dashboard) => dashboard.default
      )?._id
      if (defaultDashboardId) {
        props.setSelectedDashboardId(defaultDashboardId)
      }
    }
  }, [dashboards])

  const createModalRef = useRef<DashboardModalCreateRef>(null)
  const doCreateDashboard = async (data: any) => {
    const createdDashboard = await createDashboard(data)
    createModalRef.current?.doClose()
    props.setSelectedDashboardId(createdDashboard._id)
  }

  const updateModalRef = useRef<DashboardModalEditRef>(null)
  const doUpdateDashboard = async (id: string, data: any) => {
    await updateDashboard(id, data)
    updateModalRef.current?.doClose()
  }

  const deleteModalRef = useRef<DashboardModalDeleteRef>(null)
  const doDeleteDashboard = async (id: string) => {
    await deleteDashboard(id)
    deleteModalRef.current?.doClose()
  }

  let inside: React.ReactNode
  if (loading) {
    inside = <React.Fragment>Please wait...</React.Fragment>
  } else if (error?.statusCode === 401) {
    inside = <React.Fragment>You're not logged in.</React.Fragment>
  } else {
    inside = (
      <React.Fragment>
        {dashboards?.map((dashboard) => (
          <DashboardListItem
            key={dashboard._id}
            dashboard={dashboard}
            selectedDashboardId={props.selectedDashboardId}
            setSelectedDashboardId={props.setSelectedDashboardId}
            onClickEdit={() => updateModalRef.current?.doShow(dashboard)}
            onClickDelete={() => deleteModalRef.current?.doShow(dashboard)}
          />
        ))}
      </React.Fragment>
    )
  }
  return (
    <aside className="dashboard-list">
      <div className="dashboard-list--items">{inside}</div>
      <span className="dashboard-list--bottom">
        <Button onClick={createModalRef.current?.doShow}>
          Create New Dashboard
        </Button>
      </span>
      <DashboardModalCreate onSubmit={doCreateDashboard} ref={createModalRef} />
      <DashboardModalEdit onSubmit={doUpdateDashboard} ref={updateModalRef} />
      <DashboardModalDelete
        onConfirm={doDeleteDashboard}
        ref={deleteModalRef}
      />
    </aside>
  )
}

export default DashboardList
