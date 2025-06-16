import './G.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import localidadesChaco from '@/data/chaco_localidades.json'
import chacoBorder from '@/data/chaco_border.json'
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
  CircleMarker,
  Tooltip,
} from 'react-leaflet'
import { latLng, CircleMarker as LeafletCircleMarker } from 'leaflet'
import { palColor } from '@/styles/palette'
import { FeatureCollection } from 'geojson'
import { Table } from '@/pages/Admin/components'
import { MetaModelContext } from '@/pages/Admin/contexts'
import { Button } from '@/components'
import { useQueryActionState } from '@/hooks'
import { useEntities } from '@/pages/Admin/hooks'
import { ObraMeta } from '@/pages/Admin/modules/obra/obra.meta'

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

  const start = useCallback((name: string) => {
    const marker = refs.current[name]
    if (!marker || timers.current[name]) return

    let radius = 6
    let growing = true

    const step = () => {
      radius += growing ? 0.3 : -0.3

      if (radius >= 10) growing = false
      if (radius <= 6) growing = true

      marker.setRadius(radius)
      timers.current[name] = window.setTimeout(step, PULSE_SPEED)
    }

    timers.current[name] = window.setTimeout(step, PULSE_SPEED)
  }, [])

  const stop = useCallback((name: string) => {
    const marker = refs.current[name]
    const id = timers.current[name]

    if (id) {
      clearTimeout(id)
      delete timers.current[name]
    }

    if (marker) marker.setRadius(6)
  }, [])

  const register = useCallback(
    (name: string, el: LeafletCircleMarker | null) => {
      if (el) refs.current[name] = el
    },
    [],
  )

  return { start, stop, register }
}

const G = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const animation = useCityAnimation()

  const { query, enableQuery } = useEntities(
    [ObraMeta.key],
    ObraMeta.service.getAll,
    // [ObraMeta.key, 'totales'],
    // ObraMeta.service.getAllTotales,
  )

  const { data, status, isFetching, refetch } = query

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

  const toggleCity = useCallback(
    (name: string) =>
      setSelectedCities(prev => {
        const already = prev.includes(name)

        already ? animation.stop(name) : animation.start(name)

        return already ? prev.filter(n => n !== name) : [...prev, name]
      }),
    [animation],
  )

  return (
    <div className="cmp-g">
      <div className="info">
        <h1>{selectedCities.join(', ')}</h1>

        <div>
          <Button
            title="Consultar datos"
            faIcon={`fa-solid ${
              data ? 'fa-arrows-rotate' : 'fa-cloud-arrow-down'
            }`}
            actionState={queryActionState}
            onAction={queryHandleClick}
          />
        </div>
        <MetaModelContext.Provider value={{ metaModel: ObraMeta }}>
          {data && <Table {...{ data }} />}
        </MetaModelContext.Provider>
      </div>
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
          data={chacoBorder as FeatureCollection}
          interactive={false}
          style={{
            weight: 2,
            color: palColor('B'),
            fillOpacity: 0,
            opacity: 0.625,
          }}
        />
        {localidadesChaco.features.map(({ geometry, properties }) => {
          const { type, coordinates } = geometry

          if (type !== 'Point') return

          const [lng, lat] = coordinates
          const { name, population } = properties
          const isSelected = selectedCities.includes(name)

          return (
            <CircleMarker
              key={name}
              ref={el => animation.register(name, el)}
              center={[lat, lng]}
              radius={6}
              pathOptions={{
                weight: 1.5,
                color: palColor(isSelected ? 'BD1' : 'AD1'),
                fillColor: palColor(isSelected ? 'B' : 'A'),
                fillOpacity: 0.8,
              }}
              eventHandlers={{ click: () => toggleCity(name) }}
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
        })}
      </MapContainer>
    </div>
  )
}

export default G
