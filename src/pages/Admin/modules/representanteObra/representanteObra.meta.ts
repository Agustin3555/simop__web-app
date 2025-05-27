import {
  BooleanProp,
  RefProp,
  MetaModel,
  DateProp,
} from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteMeta } from '../representante'
import { TipoRepresentanteMeta } from '../tipoRepresentante'
import { ObraMeta } from '../obra'
import { RepresentanteObraService } from './representanteObra.service'
import { RepresentanteObraModel } from '.'

export const RepresentanteObraMeta =
  new MetaModel<RepresentanteObraModel.Entity>({
    key: 'representanteObra',
    service: RepresentanteObraService,
    refreshRate: 'low',
    title: {
      singular: 'Representante de Obra',
      plural: 'Representantes de Obra',
    },
    faIcon: 'fa-solid fa-',

    anchorField: 'id',
    props: {
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
    },
  })

RepresentanteObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: RepresentanteObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(RepresentanteObraMeta.allFields) },
    ],
  },
]
