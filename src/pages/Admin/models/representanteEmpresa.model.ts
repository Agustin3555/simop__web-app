import { EmpresaModel, RepresentanteModel, TipoRepresentanteModel } from '.'
import { BooleanProp, RefProp, MetaModel, DateProp } from '../services/config'
import { RepresentanteEmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  empresa: EmpresaModel.Ref
  representante: RepresentanteModel.Ref
  tipoRepresentante: TipoRepresentanteModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'empresaId' | 'representanteId' | 'tipoRepresentanteId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'fecha'>

export const metaModel = new MetaModel<Entity>({
  key: 'representanteEmpresa',
  service: RepresentanteEmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Representante de Empresa',
    plural: 'Representantes de Empresa',
  },

  anchorField: 'id',
  props: {
    empresa: new RefProp({
      getMetaModel: () => EmpresaModel.metaModel,
    }),
    representante: new RefProp({
      getMetaModel: () => RepresentanteModel.metaModel,
    }),
    tipoRepresentante: new RefProp({
      getMetaModel: () => TipoRepresentanteModel.metaModel,
    }),
    vigencia: new BooleanProp('Vigencia', {
      falseText: 'No Vigente',
      trueText: 'Vigente',
    }),
    fecha: new DateProp('Fecha'),
    ...COMMON_PROPS,
  },
})

metaModel.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: metaModel.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(metaModel.allFields) }],
  },
]
