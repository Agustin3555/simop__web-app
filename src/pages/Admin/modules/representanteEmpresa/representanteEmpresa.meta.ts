import { BooleanProp, RefProp, MetaModel, DateProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteMeta } from '../representante/representante.meta'
import { RepresentanteEmpresaService } from './representanteEmpresa.service'
import { RepresentanteEmpresaModel } from '.'
import { TipoRepresentanteMeta } from '../tipoRepresentante/tipoRepresentante.meta'
import { EmpresaMeta } from '../empresa/empresa.meta'

export const RepresentanteEmpresaMeta =
  new MetaModel<RepresentanteEmpresaModel.Entity>({
    key: 'representanteEmpresa',
    service: RepresentanteEmpresaService,
    refreshRate: 'low',
    title: {
      singular: 'Representante de Empresa',
      plural: 'Representantes de Empresa',
    },
    faIcon: 'fa-solid fa-',

    anchorField: 'id',
    props: {
      empresa: new RefProp({
        getMetaModel: () => EmpresaMeta,
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
    },
  })

RepresentanteEmpresaMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: RepresentanteEmpresaMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(RepresentanteEmpresaMeta.allFields) },
    ],
  },
]
