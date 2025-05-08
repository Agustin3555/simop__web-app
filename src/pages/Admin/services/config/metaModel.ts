import { GeneralEntity } from '@/models/config'
import { Method, Service } from '@/services/config'
import { PropScheme } from './utils'
import { TrustedProps } from '../../types'

export type RefreshRate = 'high' | 'medium' | 'low'

interface MetaModelArgs<T = GeneralEntity> {
  key: string
  service: Service
  refreshRate?: RefreshRate
  title: {
    singular: string
    plural: string
  }

  anchorField: keyof T
  props: Record<keyof T, PropScheme>
}

type FieldsByService<T> = {
  methods: (Method | string)[]
  groups: {
    key: string
    title?: string
    fields: (keyof T)[]
  }[]
}[]

export class MetaModel<T> extends (Object as unknown as TrustedProps<
  MetaModelArgs<GeneralEntity>
>) {
  fieldsByService?: FieldsByService<T>
  allFields: (keyof T)[]

  constructor(args: MetaModelArgs<T>) {
    super()

    // Inicializa la clave de las propiedades
    Object.entries(args.props).forEach(
      ([key, prop]) => ((prop as PropScheme).key = key),
    )

    Object.assign(this, args)
    this.allFields = Object.keys(args.props) as (keyof T)[]
  }

  getPropsByService(method: Method | string) {
    const { fieldsByService, props } = this

    if (!fieldsByService) return

    const { groups } =
      fieldsByService.find(({ methods }) => methods.includes(method)) ?? {}

    return groups?.map(({ fields, ...rest }) => ({
      props: fields.map(key => props[key as string]),
      ...rest,
    }))
  }
}
