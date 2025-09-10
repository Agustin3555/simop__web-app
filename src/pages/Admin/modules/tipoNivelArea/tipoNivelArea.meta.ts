import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoNivelAreaService } from './tipoNivelArea.service'
import { TipoNivelAreaModel } from '.'
import { TipoNivelAreaProps } from './tipoNivelArea.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoNivelAreaProps

export const TipoNivelAreaMeta: MetaModelDefinition<TipoNivelAreaModel.Entity> =
  {
    config: {
      key: 'tipoNivelArea',
      service: TipoNivelAreaService,
      title: {
        singular: 'Tipo de Nivel de Área',
        plural: 'Tipos de Niveles de Área',
      },
      faIcon: 'fa-solid fa-shapes',
      anchorField: 'nombre',
      allFields,
      propFactories,
    },

    mutationsFields: {
      add: [{ fields: omitBaseEntity(allFields) }],
      edit: [{ fields: omitBaseEntity(allFields) }],
    },
  }
