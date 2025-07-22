import {
  RefProp,
  TextProp,
  NumberProp,
  defineProps,
  buildMetaModel,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { LocalidadService } from './localidad.service'
import { DepartamentoMeta } from '../departamento/departamento.meta'
import { LocalidadModel } from '.'

const { props, allFields } = defineProps<LocalidadModel.Entity>({
  nombre: new TextProp('Nombre', {
    field: {
      required: true,
    },
  }),
  departamento: new RefProp({
    getMetaModel: () => DepartamentoMeta,
  }),
  osmId: new NumberProp('OSM ID', {
    big: true,
  }),
  ...COMMON_PROPS,
})

export const LocalidadMeta = buildMetaModel(
  {
    key: 'localidad',
    title: {
      singular: 'Localidad',
      plural: 'Localidades',
    },
    faIcon: 'fa-solid fa-location-dot',

    service: LocalidadService,
    refreshRate: 'low',
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
