import {
  defineProps,
  buildMetaModel,
  createBooleanProp,
  createDateProp,
  createRefProp,
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
  obra: createRefProp({
    metaModelKey: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  representante: createRefProp({
    metaModelKey: () => RepresentanteMeta,
  }),
  tipoRepresentante: createRefProp({
    metaModelKey: () => TipoRepresentanteMeta,
  }),
  vigencia: createBooleanProp({
    title: 'Vigencia',
    config: {
      falseText: 'No Vigente',
      trueText: 'Vigente',
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
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
