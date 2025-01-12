import { Entity, Service } from '@/services/config'
import { PropScheme } from './utils'

// interface RefConfig
//   extends Column<{ option?: boolean }>,
//     Field<Required>,
//     GetScheme {}

// interface RefListConfig
//   extends Column<{ option?: boolean }>,
//     Field,
//     GetScheme {}

export interface Scheme<T = Entity> {
  key: string
  service: Service
  title: {
    singular: string
    plural: string
  }
  refAnchorField?: string

  groups: {
    title?: string
    props: Record<keyof T, PropScheme<keyof T>>
  }[]
}
