import { NumberProp, RefProp, MetaModel, TextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { PaisMeta } from '../pais'
import { ProvinciaMeta } from '../provincia'
import { LocalidadMeta } from '../localidad'
import { RepresentanteService } from './representante.service'
import { RepresentanteModel } from '.'

export const RepresentanteMeta = new MetaModel<RepresentanteModel.Entity>({
  key: 'representante',
  service: RepresentanteService,
  refreshRate: 'low',
  title: {
    singular: 'Representante',
    plural: 'Representantes',
  },
  faIcon: 'fa-solid fa-user-tie',

  anchorField: 'apellido',
  props: {
    cuil: new NumberProp('CUIL', {
      big: true,
      field: {
        required: true,
      },
    }),
    apellido: new TextProp('Apellido', {
      field: {
        required: true,
      },
    }),
    nombre: new TextProp('Nombre'),
    direccion: new TextProp('Dirección'),
    numeroMatricula: new TextProp('Número de Matricula'),
    pais: new RefProp({
      getMetaModel: () => PaisMeta,
    }),
    provincia: new RefProp({
      getMetaModel: () => ProvinciaMeta,
    }),
    localidad: new RefProp({
      getMetaModel: () => LocalidadMeta,
    }),
    ...COMMON_PROPS,
  },
})

RepresentanteMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: RepresentanteMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(RepresentanteMeta.allFields) }],
  },
]
