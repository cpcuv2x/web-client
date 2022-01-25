import axios, { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import useSWR from 'swr'
import { v4 as uuidv4 } from 'uuid'

import { DashboardItem } from '../interfaces/DashboardItem'
import { DashboardWithItems } from '../interfaces/DashboardWithItems'
import { LayoutWithDashboardItem } from '../interfaces/LayoutWithDashboardItem'
import { WebServiceError } from '../interfaces/WebServiceError'

import axiosFetcher from '../utils/axiosFetcher'
import useDeepEffect from './useDeepEffect'

const useDashboard = (dashboardId: string) => {
  const fetchKey = !!dashboardId ? `/api/dashboards/${dashboardId}` : null
  const { data, error, mutate } = useSWR<
    DashboardWithItems | null,
    AxiosError<WebServiceError>
  >(fetchKey, axiosFetcher)
  const [layout, setLayout] = useState<LayoutWithDashboardItem[] | undefined>(
    undefined
  )

  const associationIdToDashboardItemMapper = useRef(new Map())

  useEffect(() => {
    setLayout(undefined)
  }, [dashboardId])

  useDeepEffect(() => {
    if (data) {
      associationIdToDashboardItemMapper.current = new Map()
      data.items.forEach((association: any) =>
        associationIdToDashboardItemMapper.current.set(
          association._id,
          association.dashboardItem
        )
      )
      const generatedLayout = data.items.map<LayoutWithDashboardItem>(
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
  }, [data?._id, data?.items])

  const updateLayout = (modifiedLayout: ReactGridLayout.Layout[]) => {
    setLayout(
      modifiedLayout.map<LayoutWithDashboardItem>((piece) => ({
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
      await mutate()
      console.debug('Saving completed.')
    }
  }

  const addItem = (dashboardItem: DashboardItem) => {
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

  const deleteItem = (associationId: string) => {
    associationIdToDashboardItemMapper.current.delete(associationId)
    setLayout(
      (currentLayout) =>
        currentLayout &&
        currentLayout.filter((piece) => piece.i !== associationId)
    )
  }

  return {
    layout,
    updateLayout,
    saveLayout,
    addItem,
    deleteItem,
    loading: !layout,
    error: error?.response?.data,
  }
}

export default useDashboard
