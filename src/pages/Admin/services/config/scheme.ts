import { Service } from '@/services/config'
import { PropScheme } from './utils'

// interface RefConfig
//   extends Column<{ option?: boolean }>,
//     Field<Required>,
//     GetScheme {}

// interface RefListConfig
//   extends Column<{ option?: boolean }>,
//     Field,
//     GetScheme {}

export interface Scheme<T = unknown> {
  key: string
  title: {
    singular: string
    plural: string
  }
  service: Service

  groups: {
    title?: string
    props: Partial<Record<keyof T, PropScheme<keyof T>>>
  }[]
}
