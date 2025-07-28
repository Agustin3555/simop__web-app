import { ViewInfo } from '../contexts/viewsInfo.context'

export const AUX_VIEWS = {
  planificacionGeografica: {
    title: 'Planificación Geográfica',
    faIcon: 'fa-solid fa-map-location-dot',
  },
  obraTotales: {
    title: 'Totales de Obra',
  },
  obraDetalle: {
    title: 'Detalle de Obra Básica',
  },
} satisfies Record<string, ViewInfo>

export type AuxViewKey = keyof typeof AUX_VIEWS
