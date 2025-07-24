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
import { RepresentanteMeta } from '../representante/representante.meta'
import { RepresentanteEmpresaService } from './representanteEmpresa.service'
import { RepresentanteEmpresaModel } from '.'
import { TipoRepresentanteMeta } from '../tipoRepresentante/tipoRepresentante.meta'
import { EmpresaMeta } from '../empresa/empresa.meta'

const { props, allFields } = defineProps<RepresentanteEmpresaModel.Entity>({
  empresa: createRefProp({
    metaModelKey: () => EmpresaMeta,
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

export const RepresentanteEmpresaMeta = buildMetaModel(
  {
    key: 'representanteEmpresa',
    service: RepresentanteEmpresaService,
    refreshRate: 'low',
    title: {
      singular: 'Representante de Empresa',
      plural: 'Representantes de Empresa',
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
