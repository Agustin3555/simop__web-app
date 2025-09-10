import { Service } from '@/services/config'
import { PropFactory, Prop } from './utils'
import { LooseEntity } from '@/models/config'
import { MetaModelsContextProps } from '../contexts/metaModels.context'

export type RefreshRate = 'high' | 'medium' | 'low'

type PropFactories<E> = Record<keyof E, PropFactory>

type Mutation = 'add' | 'edit'

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
    allFields: (keyof E)[]
    propFactories: PropFactories<E>
  }

  mutationsFields: Record<
    Mutation,
    {
      key?: string
      title?: string
      fields: (keyof E)[]
    }[]
  >
}

export const defineProps = <E>(propFactories: PropFactories<E>) => {
  const allFields = Object.keys(propFactories) as (keyof E)[]

  return { propFactories, allFields }
}

export const buildMetaModel = <E = LooseEntity>(
  { config, mutationsFields }: MetaModelDefinition<E>,
  getMetaModel: MetaModelsContextProps['getMetaModel'],
) => {
  const { propFactories, ...configRest } = config

  const props = {} as Record<keyof E, Prop>
  let ready = true

  Object.entries<PropFactory>(propFactories).forEach(([k, propFactory]) => {
    try {
      props[k as keyof E] = propFactory(k, getMetaModel)
    } catch (error) {
      ready = false
    }
  })

  const createPropGroups = (mutation: Mutation) => {
    const groups = mutationsFields[mutation]

    return groups.map(({ fields, ...rest }) => ({
      props: fields.map(k => props[k]),
      ...rest,
    }))
  }

  const createPropGroupsRecord = (mutation: Mutation) => {
    const groups = mutationsFields[mutation]

    return groups.map(({ fields, ...rest }) => {
      const acc: Record<string, Prop> = {}
      fields.forEach(k => (acc[k as string] = props[k]))
      return { props: acc, ...rest }
    })
  }

  const getProps = (fields: (keyof E)[]) => fields.map(k => props[k])

  const getPropsRecord = (fields: (keyof E)[]) => {
    const acc: Record<string, Prop> = {}
    fields.forEach(k => (acc[k as string] = props[k]))
    return acc
  }

  const addProps = {
    groups: createPropGroups('add'),
    groupsRecord: createPropGroupsRecord('add'),
  }

  const editProps = {
    groups: createPropGroups('edit'),
    groupsRecord: createPropGroupsRecord('edit'),
  }

  const data = {
    ...configRest,
    props,
    addProps,
    editProps,
    getProps,
    getPropsRecord,
  }

  return { ready, data }
}

export type MetaModel<E = LooseEntity> = ReturnType<
  typeof buildMetaModel<E>
>['data']
