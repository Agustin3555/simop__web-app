import './Map.css'
import { useEffect, useMemo } from 'react'
import { useQueryActionState } from '@/hooks'
import { useLazyQuery, useMetaModels } from '@/pages/Admin/hooks'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { DataDownloadBanner } from '@/pages/Admin/components'
import { DepartamentosLayer, LocalidadesLayer } from './components'

const FixMapResize = () => {
  const map = useMap()

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => map.invalidateSize())
    resizeObserver.observe(map.getContainer())
    return () => resizeObserver.disconnect()
  }, [map])

  return null
}

const Map = () => {
  const { getMetaModel } = useMetaModels()

  const APGMeta = useMemo(() => getMetaModel('apg'), [])!
  const DepartamentoMeta = useMemo(() => getMetaModel('departamento'), [])!
  const LocalidadMeta = useMemo(() => getMetaModel('localidad'), [])!

  const { query, handleClick } = useLazyQuery(['map'], async () => {
    const [apgs, departamentos, localidades] = await Promise.all([
      APGMeta.service.getAll(['id', 'color', 'numero']),
      DepartamentoMeta.service.getAll(['osmId', 'apg']),
      LocalidadMeta.service.getAll(['id', 'osmId']),
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

export default Map
