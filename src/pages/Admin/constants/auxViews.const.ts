import { ViewInfo } from './views.const'

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
  obraGeneral: {
    title: 'Obra Básica General',
  },
} satisfies Record<string, ViewInfo>

export type AuxViewKey = keyof typeof AUX_VIEWS
