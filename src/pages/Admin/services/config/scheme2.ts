import { GeneralEntity } from '@/models/config'
import { Method, Service } from '@/services/config'
import { PropScheme } from './utils'

export type RefreshRate = 'high' | 'medium' | 'low'

export interface Scheme<E = GeneralEntity> {
  key: string
  service: Service
  refreshRate?: RefreshRate
  title: {
    singular: string
    plural: string
  }
  anchorField: keyof E
  quickFilters?: (keyof E)[]

  props: Record<keyof E, PropScheme>

  fieldsByService: {
    methods: (Method | string)[]
    groups: {
      key: string
      title?: string
      fields: (keyof E)[]
    }[]
  }[]
}

export const getPropsByService = (
  { fieldsByService, props }: Scheme,
  method: Method | string,
) => {
  const { groups } =
    fieldsByService.find(({ methods }) => methods.includes(method)) ?? {}

  if (!groups) return

  return groups.map(({ fields, ...rest }) => ({
    props: fields.map(key => props[key]),
    ...rest,
  }))
}

export const getFlatProps = (
  groups: NonNullable<ReturnType<typeof getPropsByService>>,
) => groups.flatMap(({ props }) => props)
