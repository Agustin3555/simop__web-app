import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTable } from '@/pages/Admin/hooks'
import { CircleMarker, Tooltip } from 'react-leaflet'
import { CircleMarker as LeafletCircleMarker } from 'leaflet'
import { palColor } from '@/styles/palette'
import { GeneralEntity } from '@/models/config'
import geoLocalidades from '@/data/chaco_localidades.json'

const PULSE_SPEED = 37.5

const useAnimation = () => {
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

interface LocalidadesLayerProps {
  localidades: GeneralEntity[]
}

const LocalidadesLayer = ({ localidades }: LocalidadesLayerProps) => {
  const animation = useAnimation()

  const { table, columnFilters } = useTable() ?? {}
  const { getFilterValue, setFilterValue } =
    table?.getColumn('localidades') ?? {}

  const selectedCities = useMemo(() => {
    const cityFilter = columnFilters?.state?.find(f => f.id === 'localidades')
    return (cityFilter?.value as string[] | undefined) ?? []
  }, [columnFilters?.state])

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

  return (
    <>
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
    </>
  )
}

export default LocalidadesLayer
