import { useCallback, useEffect, useState } from 'react'
import { GeoJSON, useMap } from 'react-leaflet'
import { palColorGS } from '@/styles/palette'
import { FeatureCollection, Geometry } from 'geojson'
import { GeneralEntity } from '@/models/config'
import { GeoJSONOptions, StyleFunction } from 'leaflet'
import geoDepartamentosBorder from '@/data/chaco_departamentos_border.json'

interface DepartamentoLayerProps {
  apgs: GeneralEntity[]
  departamentos: GeneralEntity[]
}

const DepartamentoLayer = ({ apgs, departamentos }: DepartamentoLayerProps) => {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())

  useEffect(() => {
    const handleZoom = () => setZoom(map.getZoom())

    map.on('zoomend', handleZoom)

    return () => {
      map.off('zoomend', handleZoom)
    }
  }, [map])

  const getAPGThroughDepartamento = useCallback(
    (featureId?: string) => {
      if (!featureId) return

      const departamento = departamentos?.find(({ osmId }) => {
        if (osmId === undefined) return

        const findOsmId = featureId.match(/(\d+)$/)?.[1]

        return osmId === findOsmId
      })

      if (!departamento) return

      return apgs?.find(({ id }) => id === departamento.apg.id)
    },
    [apgs, departamentos],
  )

  const getOpacity = useCallback(() => {
    const opacityMin = 0
    const opacityMax = 1

    const zoomMin = 0
    const zoomMax = 12

    const clampedZoom = Math.max(zoomMin, Math.min(zoom, zoomMax))
    const t = (clampedZoom - zoomMin) / (zoomMax - zoomMin)

    return opacityMax - t * (opacityMax - opacityMin)
  }, [zoom])

  const styleFn = useCallback<StyleFunction>(
    feature => ({
      color: palColorGS('black'),
      weight: 0.25,
      fillColor:
        getAPGThroughDepartamento(feature?.id as string)?.color ?? '#fff',
      fillOpacity: getOpacity(),
    }),
    [getAPGThroughDepartamento, getOpacity],
  )

  const handleEachFeature = useCallback<
    NonNullable<GeoJSONOptions<any, Geometry>['onEachFeature']>
  >(
    (feature, layer) => {
      const title = `APG  ${
        getAPGThroughDepartamento(feature.id as string)?.numero ?? '?'
      }`

      layer.bindTooltip(title, {
        sticky: true,
        direction: 'right',
        opacity: 0.8,
        offset: [10, 0],
      })
    },
    [getAPGThroughDepartamento],
  )

  return (
    <GeoJSON
      data={geoDepartamentosBorder as FeatureCollection}
      style={styleFn}
      onEachFeature={handleEachFeature}
    />
  )
}

export default DepartamentoLayer
