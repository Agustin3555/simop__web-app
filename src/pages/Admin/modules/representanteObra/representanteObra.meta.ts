import {
  BooleanProp,
  RefProp,
  DateProp,
  defineProps,
  buildMetaModel,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteObraService } from './representanteObra.service'
import { RepresentanteObraModel } from '.'
import { ObraMeta } from '../obra/obra.meta'
import { RepresentanteMeta } from '../representante/representante.meta'
import { TipoRepresentanteMeta } from '../tipoRepresentante/tipoRepresentante.meta'

const { props, allFields } = defineProps<RepresentanteObraModel.Entity>({
  obra: new RefProp({
    getMetaModel: () => ObraMeta,
    field: {
      required: true,
    },
  }),
  representante: new RefProp({
    getMetaModel: () => RepresentanteMeta,
  }),
  tipoRepresentante: new RefProp({
    getMetaModel: () => TipoRepresentanteMeta,
  }),
  vigencia: new BooleanProp('Vigencia', {
    falseText: 'No Vigente',
    trueText: 'Vigente',
  }),
  fecha: new DateProp('Fecha'),
  ...COMMON_PROPS,
})

export const RepresentanteObraMeta = buildMetaModel(
  {
    key: 'representanteObra',
    service: RepresentanteObraService,
    refreshRate: 'low',
    title: {
      singular: 'Representante de Obra',
      plural: 'Representantes de Obra',
    },
    faIcon: 'fa-solid fa-user-tie',
    anchorField: 'id',
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
