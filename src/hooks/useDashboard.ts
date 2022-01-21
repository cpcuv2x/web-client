import axios, { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import useSWR from 'swr'
import { v4 as uuidv4 } from 'uuid'

// FIXME: Use common fetcher
const fetcher = async (path: string) => {
  const response = await axios.get(path)
  return response.data
}

interface DashboardItem {
  _id: string
  metadata: string
  __v: number
}

interface DashboardItemAssociation {
  _id: string
  dashboardItem: DashboardItem
  x: number
  y: number
  w: number
  h: number
  __v: number
}

interface Dashboard {
  _id: string
  default: boolean
  name: string
  items: DashboardItemAssociation[]
  __v: number
}

// FIXME: Move to another file and make it common
interface WebServiceError {
  error: string
  message: string
  statusCode: number
}

interface CustomizedLayout extends ReactGridLayout.Layout {
  dashboardItem: DashboardItem
}

const useDashboard = (dashboardId: string) => {
  const fetchKey = !!dashboardId ? `/api/dashboards/${dashboardId}` : null
  const { data, error, mutate } = useSWR<
    Dashboard | null,
    AxiosError<WebServiceError>
  >(fetchKey, fetcher)
  const [layout, setLayout] = useState<CustomizedLayout[] | undefined>(
    undefined
  )

  const associationIdToDashboardItemMapper = useRef(new Map())
  const dataHasBeenMutatedToNullOnce = useRef(false)

  useEffect(() => {
    setLayout(undefined)
    const mutateToEmpty = async () => {
      dataHasBeenMutatedToNullOnce.current = false
      await mutate(null)
      dataHasBeenMutatedToNullOnce.current = true
    }
    mutateToEmpty()
  }, [dashboardId])

  useEffect(() => {
    if (data && dataHasBeenMutatedToNullOnce.current) {
      associationIdToDashboardItemMapper.current = new Map()
      data.items.forEach((association: any) =>
        associationIdToDashboardItemMapper.current.set(
          association._id,
          association.dashboardItem
        )
      )
      const generatedLayout = data.items.map<CustomizedLayout>(
        (association) => ({
          i: association._id,
          x: association.x,
          y: association.y,
          w: association.w,
          h: association.h,
          dashboardItem: association.dashboardItem,
        })
      )
      setLayout(generatedLayout)
    }
  }, [data])

  const handleLayoutChange = (modifiedLayout: ReactGridLayout.Layout[]) => {
    setLayout(
      modifiedLayout.map<CustomizedLayout>((piece) => ({
        ...piece,
        dashboardItem: associationIdToDashboardItemMapper.current.get(piece.i),
      }))
    )
  }

  const saveLayout = async () => {
    if (dashboardId && layout) {
      await axios.patch(`/api/dashboards/${dashboardId}/update-items`, {
        associations: layout.map((piece) => ({
          dashboardItemId: piece.dashboardItem._id,
          x: piece.x,
          y: piece.y,
          w: piece.w,
          h: piece.h,
        })),
      })
      console.debug('Saving completed.')
    }
  }

  const handleAddItem = (dashboardItem: DashboardItem) => {
    const randomAssociationId = uuidv4()
    associationIdToDashboardItemMapper.current.set(
      randomAssociationId,
      dashboardItem
    )
    setLayout(
      (currentLayout) =>
        currentLayout && [
          ...currentLayout,
          { i: randomAssociationId, x: 0, y: 0, h: 1, w: 1, dashboardItem },
        ]
    )
  }

  const handleDeleteItem = (associationId: string) => {
    associationIdToDashboardItemMapper.current.delete(associationId)
    setLayout(
      (currentLayout) =>
        currentLayout &&
        currentLayout.filter((piece) => piece.i !== associationId)
    )
  }

  return {
    layout,
    handleLayoutChange,
    saveLayout,
    handleAddItem,
    handleDeleteItem,
    loading: !layout,
    error: error?.response?.data,
  }
}

export default useDashboard
