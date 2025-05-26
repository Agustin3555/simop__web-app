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
  faIcon?: string

  anchorField: keyof T
  props: Record<keyof T, PropScheme>
}

type FieldsByService<T> = {
  methods: (Method | string)[]
  fields?: (keyof T)[]
  groups?: {
    key: string
    title?: string
    fields: (keyof T)[]
  }[]
}[]

export class MetaModel<T = any> extends (Object as unknown as TrustedProps<
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

  getFields = (method: Method | string) => {
    const { fieldsByService } = this

    const { fields } =
      fieldsByService?.find(({ methods }) => methods.includes(method)) ?? {}

    return fields as string[] | undefined
  }

  getPropFields = (method: Method | string) => {
    const { props, getFields } = this

    const fields = getFields(method)

    return fields?.map(key => props[key as string])
  }

  getPropFieldsRecord = (method: Method | string) => {
    const { props, getFields } = this

    const fields = getFields(method)

    const acc: Record<string, PropScheme> = {}

    fields?.forEach(key => (acc[key as string] = props[key as string]))

    return acc
  }

  getGroups = (method: Method | string) => {
    const { fieldsByService } = this

    const { groups } =
      fieldsByService?.find(({ methods }) => methods.includes(method)) ?? {}

    return groups
  }

  getPropGroups = (method: Method | string) => {
    const { props, getGroups } = this

    const groups = getGroups(method)

    return groups?.map(({ fields, ...rest }) => ({
      props: fields.map(key => props[key as string]),
      ...rest,
    }))
  }

  getPropGroupsRecord = (method: Method | string) => {
    const { props, getGroups } = this

    const groups = getGroups(method)

    return groups?.map(({ fields, ...rest }) => {
      const acc: Record<string, PropScheme> = {}

      fields.forEach(key => (acc[key as string] = props[key as string]))

      return { props: acc, ...rest }
    })
  }
}
