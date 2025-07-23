import { Method, Service } from '@/services/config'
import { PropFactory, Prop } from './utils'
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

interface Config<E> {
  key: string
  title: {
    singular: string
    plural: string
  }
  faIcon?: string

  service: Service<E>
  refreshRate?: RefreshRate
  anchorField: keyof E
  props: Record<keyof E, Prop>
}

export const defineProps = <E>(propsFactory: Record<keyof E, PropFactory>) => {
  const props: Record<string, Prop> = {}

  Object.entries<PropFactory>(propsFactory).forEach(
    ([key, propFactory]) => (props[key] = propFactory(key)),
  )

  const allFields = Object.keys(propsFactory) as (keyof E)[]

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
    const acc: Record<string, Prop> = {}
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
      const acc: Record<string, Prop> = {}
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
