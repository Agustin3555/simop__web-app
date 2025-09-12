import { ViewInfo } from '../contexts/viewsInfo.context'

export const AUX_VIEWS = {
  obraDetalle: {
    title: 'Detalle',
  },
} satisfies Record<string, ViewInfo>

export type AuxViewKey = keyof typeof AUX_VIEWS
