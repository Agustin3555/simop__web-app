import './Map.css'
import { useEffect } from 'react'
import { useQueryActionState } from '@/hooks'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { DepartamentosLayer, LocalidadesLayer } from './components'
import DataDownloadBanner from '@/pages/Admin/components/DataDownloadBanner/DataDownloadBanner'
import { useTableQuery } from '@/pages/Admin/hooks/useTableQuery.hook'

const FixMapResize = () => {
  const map = useMap()

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => map.invalidateSize())
    resizeObserver.observe(map.getContainer())
    return () => resizeObserver.disconnect()
  }, [map])

  return null
}

export const Map = () => {
  const { getMetaModel } = useMetaModels()

  const { query, refetch: handleClick } = useTableQuery(['map'], async () => {
    const [apgs, departamentos, localidades] = await Promise.all([
      getMetaModel('apg')!.service.getAll(['id', 'color', 'numero']),
      getMetaModel('departamento')!.service.getAll(['osmId', 'apg']),
      getMetaModel('localidad')!.service.getAll(['id', 'osmId']),
    ])

    return { apgs, departamentos, localidades }
  })

  const { data, status, isFetching } = query
  const { apgs, departamentos, localidades } = data ?? {}

  const queryActionState = useQueryActionState({ status, isFetching })

  return apgs && departamentos && localidades ? (
    <div className="cmp-map">
      <MapContainer
        className="map"
        center={[-26.1, -60.7]}
        zoom={8}
        zoomControl={false}
      >
        <FixMapResize />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <DepartamentosLayer {...{ apgs, departamentos }} />
        <LocalidadesLayer {...{ localidades }} />
      </MapContainer>
    </div>
  ) : (
    <DataDownloadBanner
      particles={false}
      actionState={queryActionState}
      onDownload={handleClick}
    />
  )
}
