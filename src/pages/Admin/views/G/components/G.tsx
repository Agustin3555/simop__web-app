import './G.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
  CircleMarker,
  Tooltip,
} from 'react-leaflet'
import { latLng, CircleMarker as LeafletCircleMarker } from 'leaflet'
import { palColor, palColorGS } from '@/styles/palette'
import { FeatureCollection } from 'geojson'
import {
  DataDownloadBanner,
  ReportButton,
  ReportInTable,
  Table,
} from '@/pages/Admin/components'
import { MetaModelContext, TableProvider } from '@/pages/Admin/contexts'
import { Button, Toggle } from '@/components'
import { useQueryActionState } from '@/hooks'
import {
  useCombinedQuery,
  useEntities,
  useMetaModel,
  useTable,
} from '@/pages/Admin/hooks'
import { ObraMeta } from '@/pages/Admin/modules/obra/obra.meta'
import { LocalidadMeta } from '@/pages/Admin/modules/localidad/localidad.meta'
import { classList } from '@/helpers'
import { generateTableImages } from '@/pages/Admin/helpers'
import geoLocalidades from '@/data/chaco_localidades.json'
import geoBorder from '@/data/chaco_border.json'
import geoDepartamentosBorder from '@/data/chaco_departamentos_border.json'

// const CiudadesEnVista = ({ setVisibles }: { setVisibles: Function }) => {
//   const map = useMap()

//   useEffect(() => {
//     const actualizarCiudades = () => {
//       const bounds = map.getBounds()
//       const visibles = localidadesChaco.features.filter(f => {
//         if (f.geometry.type === 'Point') {
//           const [lng, lat] = f.geometry.coordinates
//           return bounds.contains(latLng(lat, lng))
//         }
//         return false
//       })
//       setVisibles(visibles)
//     }

//     actualizarCiudades()

//     map.on('moveend', actualizarCiudades)

//     return () => map.off('moveend', actualizarCiudades)
//   }, [map, setVisibles])

//   return null
// }

const colors = {
  1: '#00203a',
  2: '#5059bc',
  3: '#e5007f',
  4: '#063565',
  5: '#859546',
  6: '#f26df9',
  7: '#c8d29c',
}

const matcher = (id?: string) => colors[Number(id?.at(-1) ?? 2)]

const FixMapResize = () => {
  const map = useMap()

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => map.invalidateSize())
    resizeObserver.observe(map.getContainer())
    return () => resizeObserver.disconnect()
  }, [map])

  return null
}

const PULSE_SPEED = 37.5

const useCityAnimation = () => {
  const refs = useRef<Record<string, LeafletCircleMarker>>({})
  const timers = useRef<Record<string, number>>({})

  const start = useCallback((id: number) => {
    const marker = refs.current[id]
    if (!marker || timers.current[id]) return

    let radius = 6
    let growing = true

    const step = () => {
      radius += growing ? 0.3 : -0.3

      if (radius >= 10) growing = false
      if (radius <= 6) growing = true

      marker.setRadius(radius)
      timers.current[id] = window.setTimeout(step, PULSE_SPEED)
    }

    timers.current[id] = window.setTimeout(step, PULSE_SPEED)
  }, [])

  const stop = useCallback((id: number) => {
    const marker = refs.current[id]
    const timerId = timers.current[id]

    if (timerId) {
      clearTimeout(timerId)
      delete timers.current[id]
    }

    if (marker) marker.setRadius(6)
  }, [])

  const register = useCallback((id: number, el: LeafletCircleMarker | null) => {
    if (el) refs.current[id] = el
  }, [])

  return { start, stop, register }
}

const ContextualizedG = () => {
  const [enableMap, setEnableMap] = useState(true)

  const animation = useCityAnimation()

  const { table, columnFilters } = useTable() ?? {}
  const { getFilterValue, setFilterValue } = table?.getColumn('localidad') ?? {}

  const selectedCities = useMemo(() => {
    const cityFilter = columnFilters?.state?.find(f => f.id === 'localidad')
    return (cityFilter?.value as string[] | undefined) ?? []
  }, [columnFilters?.state])

  const obrasQuery = useEntities([ObraMeta.key], ObraMeta.service.getAll)

  const localidadesQuery = useEntities(
    [LocalidadMeta.key],
    LocalidadMeta.service.getAll,
  )

  const { data, status, isFetching, refetch, enableQuery } = useCombinedQuery(
    obrasQuery,
    localidadesQuery,
  )

  const [obras, localidades] = data ?? []

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

  const handleToggleCityClick = useCallback(
    (id: number) => {
      const prev = (getFilterValue?.() ?? []) as string[]

      const already = prev.includes(String(id))

      const updated = already
        ? prev.filter(n => n !== String(id))
        : [...prev, String(id)]

      setFilterValue?.(updated)
    },
    [getFilterValue, setFilterValue],
  )

  useEffect(() => {
    if (!localidades) return

    const selected = selectedCities.map(Number)

    localidades.forEach(({ id }) => {
      selected.includes(id) ? animation.start(id) : animation.stop(id)
    })
  })

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
    <div className="cmp-g">
      {data ? (
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
            <MetaModelContext.Provider value={{ metaModel: ObraMeta }}>
              <Table
                data={obras!}
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
              {/* <CiudadesEnVista setVisibles={setLocalidadesVisibles} /> */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
              <GeoJSON
                data={geoBorder as FeatureCollection}
                interactive={false}
                style={{
                  weight: 1.75,
                  color: palColor('B'),
                  fillOpacity: 0,
                  opacity: 0.625,
                }}
              />
              {/* <GeoJSON
                data={geoDepartamentosBorder as FeatureCollection}
                style={feature => ({
                  color: palColorGS('black'),
                  weight: 0.125,
                  fillColor: matcher(feature?.id as string),
                  fillOpacity: 0.125,
                })}
              /> */}
              {geoLocalidades.features.map(
                ({ id: fullOsmId, geometry, properties }) => {
                  const { type, coordinates } = geometry

                  if (type !== 'Point') return

                  const { id } =
                    localidades?.find(l => {
                      if (l.osmId === undefined) return

                      const osmId = fullOsmId.match(/(\d+)$/)?.[1]

                      return l.osmId === osmId
                    }) ?? {}

                  if (id === undefined) return

                  const [lng, lat] = coordinates
                  const { name, population } = properties

                  const isSelected = selectedCities
                    ? selectedCities.includes(String(id))
                    : false

                  return (
                    <CircleMarker
                      key={id}
                      ref={el => animation.register(id, el)}
                      center={[lat, lng]}
                      radius={6}
                      pathOptions={{
                        weight: 1.5,
                        color: palColor(isSelected ? 'BD1' : 'AD1'),
                        fillColor: palColor(isSelected ? 'B' : 'A'),
                        fillOpacity: 0.8,
                      }}
                      eventHandlers={{ click: () => handleToggleCityClick(id) }}
                    >
                      <Tooltip
                        direction="top"
                        offset={[0, -8]}
                        permanent={Number(population) > 20000}
                        opacity={0.9}
                      >
                        {name}
                      </Tooltip>
                    </CircleMarker>
                  )
                },
              )}
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

const G = () => (
  <TableProvider>
    <ContextualizedG />
  </TableProvider>
)

export default G
