import {
  defineProps,
  buildMetaModel,
  createTextProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { DepartamentoService } from './departamento.service'
import { DepartamentoModel } from '.'
import { ProvinciaMeta } from '../provincia/provincia.meta'
import { APGMeta } from '../apg/apg.meta'

const { props, allFields } = defineProps<DepartamentoModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  osmId: createNumberProp({
    title: 'OSM ID',
    config: {
      isBig: true,
    },
  }),
  provincia: createRefProp({
    metaModelKey: () => ProvinciaMeta,
  }),
  apg: createRefProp({
    metaModelKey: () => APGMeta,
  }),
  ...COMMON_PROPS,
})

export const DepartamentoMeta = buildMetaModel(
  {
    key: 'departamento',
    service: DepartamentoService,
    refreshRate: 'low',
    title: {
      singular: 'Departamento',
      plural: 'Departamentos',
    },
    faIcon: 'fa-solid fa-vector-square',
    anchorField: 'nombre',
    props,
  },
  [
    {
      methods: [Method.GetAll, Method.GetOne],
      fields: allFields,
    },
    {
      methods: [Method.Create, Method.UpdateOne],
      groups: [{ fields: omitBaseEntity(allFields) }],
    },
  ],
)
