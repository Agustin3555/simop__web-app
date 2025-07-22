import {
  NumberProp,
  RefProp,
  TextProp,
  defineProps,
  buildMetaModel,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteService } from './representante.service'
import { RepresentanteModel } from '.'
import { LocalidadMeta } from '../localidad/localidad.meta'
import { PaisMeta } from '../pais/pais.meta'
import { ProvinciaMeta } from '../provincia/provincia.meta'

const { props, allFields } = defineProps<RepresentanteModel.Entity>({
  cuil: new NumberProp('CUIL', {
    big: true,
    field: { required: true },
  }),
  apellido: new TextProp('Apellido', {
    field: { required: true },
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
})

export const RepresentanteMeta = buildMetaModel(
  {
    key: 'representante',
    service: RepresentanteService,
    refreshRate: 'low',
    title: {
      singular: 'Representante',
      plural: 'Representantes',
    },
    faIcon: 'fa-solid fa-user-tie',
    anchorField: 'apellido',
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
