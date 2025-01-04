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
  title: {
    singular: string
    plural: string
  }
  service: Service

  groups: {
    title?: string
    props: Record<keyof T, PropScheme<keyof T>>
  }[]
}
