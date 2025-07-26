import { Method, Service } from '@/services/config'
import { PropFactory, Prop } from './utils'
import { LooseEntity } from '@/models/config'
import { MetaModelsContextProps } from '../contexts'

export type RefreshRate = 'high' | 'medium' | 'low'

type PropFactories<E> = Record<keyof E, PropFactory>

export interface MetaModelDefinition<E = LooseEntity> {
  config: {
    key: string
    title: {
      singular: string
      plural: string
    }
    faIcon?: string

    service: Service<E>
    refreshRate?: RefreshRate
    anchorField: keyof E
    propFactories: PropFactories<E>
  }

  fieldsByService: {
    methods: (Method | string)[]
    fields?: (keyof E)[]
    groups?: {
      key?: string
      title?: string
      fields: (keyof E)[]
    }[]
  }[]
}

export const defineProps = <E>(propFactories: PropFactories<E>) => {
  const allFields = Object.keys(propFactories) as (keyof E)[]

  return { propFactories, allFields }
}

export type MetaModel<E = LooseEntity> = ReturnType<typeof buildMetaModel<E>>

export const buildMetaModel = <E = LooseEntity>(
  { config, fieldsByService }: MetaModelDefinition<E>,
  getMetaModel: MetaModelsContextProps['getMetaModel'],
) => {
  const { propFactories, ...configRest } = config

  const props = {} as Record<keyof E, Prop>

  Object.entries<PropFactory>(propFactories).forEach(
    ([key, propFactory]) =>
      (props[key as keyof E] = propFactory(key, getMetaModel)),
  )

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
    ...configRest,
    props,
    getFields,
    getPropFields,
    getPropFieldsRecord,
    getGroups,
    getPropGroups,
    getPropGroupsRecord,
  }
}
