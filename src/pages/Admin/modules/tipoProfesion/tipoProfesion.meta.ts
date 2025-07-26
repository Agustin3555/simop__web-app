import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProfesionService } from './tipoProfesion.service'
import { TipoProfesionProps } from './tipoProfesion.props'
import { TipoProfesionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoProfesionProps

export const TipoProfesionMeta: MetaModelDefinition<TipoProfesionModel.Entity> =
  {
    config: {
      key: 'tipoProfesion',
      service: TipoProfesionService,
      title: {
        singular: 'Profesión',
        plural: 'Profesiones',
      },
      faIcon: 'fa-solid fa-shapes',
      anchorField: 'nombre',
      propFactories,
    },

    fieldsByService: [
      {
        methods: [Method.GetAll, Method.GetOne],
        fields: allFields,
      },
      {
        methods: [Method.Create, Method.UpdateOne],
        groups: [{ fields: omitBaseEntity(allFields) }],
      },
    ],
  }
