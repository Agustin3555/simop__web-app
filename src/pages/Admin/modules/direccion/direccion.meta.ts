import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { MetaModel, RefProp, TextProp } from '../../meta'
import { SubsecretariaMeta } from '../subsecretaria'
import { DireccionService } from './direccion.service'
import { DireccionModel } from '.'

export const DireccionMeta = new MetaModel<DireccionModel.Entity>({
  key: 'direccion',
  service: DireccionService,
  title: {
    singular: 'Dirección',
    plural: 'Direcciones',
  },
  faIcon: 'fa-solid fa-network-wired',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    subSecretaria: new RefProp({
      getMetaModel: () => SubsecretariaMeta,
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})

DireccionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: DireccionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(DireccionMeta.allFields) }],
  },
]
