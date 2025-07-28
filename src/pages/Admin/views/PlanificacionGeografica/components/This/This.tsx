import './This.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import {
  DataDownloadBanner,
  ReportButton,
  ReportInTable,
  Table,
} from '@/pages/Admin/components'
import { Button, Toggle } from '@/components'
import { useQueryActionState } from '@/hooks'
import {
  useCombinedQuery,
  useEntities,
  useMetaModels,
} from '@/pages/Admin/hooks'
import { classList } from '@/helpers'
import { generateTableImages } from '@/pages/Admin/helpers'
import { DepartamentosLayer, LocalidadesLayer } from './components'
import { MetaModelContext } from '@/pages/Admin/contexts/metaModel.context'
import { TableProvider } from '@/pages/Admin/contexts/table.context'

const FixMapResize = () => {
  const map = useMap()

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => map.invalidateSize())
    resizeObserver.observe(map.getContainer())
    return () => resizeObserver.disconnect()
  }, [map])

  return null
}

const ContextualizedThis = () => {
  const [enableMap, setEnableMap] = useState(true)
  const { getMetaModel } = useMetaModels()

  const APGMeta = useMemo(() => getMetaModel('apg'), [])!
  const DepartamentoMeta = useMemo(() => getMetaModel('departamento'), [])!
  const LocalidadMeta = useMemo(() => getMetaModel('localidad'), [])!
  const ObraMeta = useMemo(() => getMetaModel('obra'), [])!

  const apgsQuery = useEntities([APGMeta.key], APGMeta.service.getAll)

  const departamentosQuery = useEntities(
    [DepartamentoMeta.key],
    DepartamentoMeta.service.getAll,
  )

  const localidadesQuery = useEntities(
    [LocalidadMeta.key],
    LocalidadMeta.service.getAll,
  )

  const obrasQuery = useEntities([ObraMeta.key], ObraMeta.service.getAll)

  const { data, status, isFetching, refetch, enableQuery } = useCombinedQuery(
    apgsQuery,
    departamentosQuery,
    localidadesQuery,
    obrasQuery,
  )

  const [apgs, departamentos, localidades, obras] = data ?? []

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

  const infoRef = useRef<HTMLDivElement | null>(null)

  const handleReportGenerate = useCallback(async () => {
    if (!infoRef.current) return

    const infoElement = infoRef.current

    const tableElement = infoElement.querySelector<HTMLElement>('.table')
    if (!tableElement) return

    const imageUrls = await generateTableImages(tableElement)
    if (!imageUrls) return

    return <ReportInTable schemeTitle="Obras" {...{ imageUrls }} />
  }, [])

  return (
    <div className="cmp-this">
      {apgs && departamentos && localidades && obras ? (
        <>
          <div className="info" ref={infoRef}>
            <div className="actions">
              <Button
                title="Consultar datos"
                faIcon="fa-solid fa-arrows-rotate"
                actionState={queryActionState}
                onAction={queryHandleClick}
              />
              <div className="right">
                <ReportButton onGenerate={handleReportGenerate} />
                <Toggle
                  title="Mostrar mapa"
                  faIcon="fa-solid fa-map"
                  size="l"
                  value={enableMap}
                  setValue={setEnableMap}
                />
              </div>
            </div>
            <MetaModelContext.Provider value={ObraMeta}>
              <Table
                data={obras}
                methods={{ forGetAll: 'planificacion-geografica' }}
              />
            </MetaModelContext.Provider>
          </div>
          <div className={classList('map-container', { active: enableMap })}>
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
        </>
      ) : (
        <DataDownloadBanner
          actionState={queryActionState}
          onDownload={queryHandleClick}
        />
      )}
    </div>
  )
}

const This = () => (
  <TableProvider>
    <ContextualizedThis />
  </TableProvider>
)

export default This
