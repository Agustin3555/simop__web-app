import { Entity, EntityKey, Service } from '@/services/config'
import { PropScheme } from './utils'

// interface RefConfig
//   extends Column<{ option?: boolean }>,
//     Field<Required>,
//     GetScheme {}

// interface RefListConfig
//   extends Column<{ option?: boolean }>,
//     Field,
//     GetScheme {}

export type RefreshRate = 'high' | 'medium' | 'low'

export interface Scheme<E = Entity> {
  key: string
  service: Service
  refreshRate?: RefreshRate
  title: {
    singular: string
    plural: string
  }
  anchorField: keyof E
  columnVisibility?: (keyof E)[]
  quickFilters?: (keyof E)[]

  groups: {
    title?: string
    props: Record<keyof E, PropScheme>
  }[]
}

export const getFlatProps = (scheme: Scheme) =>
  scheme.groups.reduce(
    (acc, { props }) => ({ ...acc, ...props }),
    {} as Record<EntityKey, PropScheme>,
  )
