import { Method, Service } from '@/services/config'
import { PropScheme } from './utils'
import { LooseEntity } from '@/models/config'

export type RefreshRate = 'high' | 'medium' | 'low'

type FieldsByService<E> = {
  methods: (Method | string)[]
  fields?: (keyof E)[]
  groups?: {
    key?: string
    title?: string
    fields: (keyof E)[]
  }[]
}[]

type Props<E> = Record<keyof E, PropScheme>

interface Config<E> {
  key: string
  title: {
    singular: string
    plural: string

    // singular: {
    //   long: string
    //   short?: string
    // }
    // plural: {
    //   long: string
    //   short?: string
    // }
  }
  faIcon?: string

  service: Service<E>
  refreshRate?: RefreshRate
  anchorField: keyof E
  props: Props<E>
}

export const defineProps = <E>(props: Props<E>) => {
  // Inicializa la clave de las propiedades
  Object.entries(props).forEach(
    ([key, prop]) => ((prop as PropScheme).key = key),
  )

  const allFields = Object.keys(props) as (keyof E)[]

  return { props, allFields }
}

export type MetaModel<E = LooseEntity> = ReturnType<typeof buildMetaModel<E>>

export const buildMetaModel = <E = LooseEntity>(
  config: Config<E>,
  fieldsByService: FieldsByService<E>,
) => {
  const { props } = config

  const findServiceEntry = (method: Method | string) =>
    fieldsByService?.find(({ methods }) => methods.includes(method))

  const getFields = (method: Method | string) =>
    findServiceEntry(method)?.fields as (keyof E)[] | undefined

  const getPropFields = (method: Method | string) => {
    const fields = getFields(method)
    return fields?.map(key => props[key])
  }

  const getPropFieldsRecord = (method: Method | string) => {
    const fields = getFields(method)
    const acc: Record<string, PropScheme> = {}
    fields?.forEach(key => (acc[key as string] = props[key]))
    return acc
  }

  const getGroups = (method: Method | string) =>
    findServiceEntry(method)?.groups

  const getPropGroups = (method: Method | string) => {
    const groups = getGroups(method)
    return groups?.map(({ fields, ...rest }) => ({
      props: fields.map(key => props[key]),
      ...rest,
    }))
  }

  const getPropGroupsRecord = (method: Method | string) => {
    const groups = getGroups(method)
    return groups?.map(({ fields, ...rest }) => {
      const acc: Record<string, PropScheme> = {}
      fields.forEach(key => (acc[key as string] = props[key]))
      return { props: acc, ...rest }
    })
  }

  return {
    ...config,
    getFields,
    getPropFields,
    getPropFieldsRecord,
    getGroups,
    getPropGroups,
    getPropGroupsRecord,
  }
}
