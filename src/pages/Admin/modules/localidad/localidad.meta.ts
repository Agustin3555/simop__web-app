import { RefProp, MetaModel, TextProp, NumberProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { LocalidadService } from './localidad.service'
import { LocalidadModel } from '.'
import { DepartamentoMeta } from '../departamento/departamento.meta'

export const LocalidadMeta = new MetaModel<LocalidadModel.Entity>({
  key: 'localidad',
  service: LocalidadService,
  refreshRate: 'low',
  title: {
    singular: 'Localidad',
    plural: 'Localidades',
  },
  faIcon: 'fa-solid fa-location-dot',

  anchorField: 'nombre',
  props: {
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
  },
})

LocalidadMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: LocalidadMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(LocalidadMeta.allFields) }],
  },
]
