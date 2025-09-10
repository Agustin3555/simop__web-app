import { omitBaseEntity } from '../../constants/selectors.const'
import { PagoCertificacionService } from './pagoCertificacion.service'
import { PagoCertificacionProps } from './pagoCertificacion.props'
import { PagoCertificacionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = PagoCertificacionProps

export const PagoCertificacionMeta: MetaModelDefinition<PagoCertificacionModel.Entity> =
  {
    config: {
      key: 'pagoCertificacion',
      service: PagoCertificacionService,
      refreshRate: 'medium',
      title: {
        singular: 'Pago de Certificación',
        plural: 'Pagos de Certificación',
      },
      faIcon: 'fa-solid fa-file-invoice-dollar',
      anchorField: 'numero',
      allFields,
      propFactories,
    },

    mutationsFields: {
      add: [{ fields: omitBaseEntity(allFields) }],
      edit: [{ fields: omitBaseEntity(allFields) }],
    },
  }
