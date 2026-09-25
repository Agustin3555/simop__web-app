import { select } from '../../helpers'
import { ObraService } from './obra.service'
import { ObraModel } from '.'
import { ObraProps } from './obra.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = ObraProps

const BASIC = {
  fields: select(allFields, 'only', [
    'numero',
    'nombre',
    'tipoEnteObra',
    'solicitante',
    'fechaPedido',
    'empresa',
    'numeroExpediente',
    'numeroResolucion',
    'anioResolucion',
    'numeroContratacion',
    'fechaContratacion',
    'montoContratacion',
    'tipoContratacionObra',
    'tipoOrigenFinanciamientoObra',
    'tipoFinanciamientoObra',
    'tipoProgramaObra',
    'tipoTematicaObra',
    'fechaInicio',
    'plazoMeses',
    'plazoDias',
    'nomenclaturaCatastral',
    'localidades',
    'direccion',
    'lugar',
    'observacionesObraRefaccionada',
    'porcentajePendienteCertificar',
    'observaciones',
  ]),
}

const VARIABLES = {
  key: 'variables',
  title: 'Variables',
  fields: select(allFields, 'only', [
    'avanceTotal',
    'tipoEstadoObra',
    'observacionesObraNueva',
    'fechaFin',
    'inaugurable',
    'inaugurada',
    'obraNueva',
    'obraRefaccionada',
  ]),
}

const MODALIDAD = {
  key: 'modalidad',
  title: 'Modalidad',
  fields: select(allFields, 'only', [
    'porcentajeObraNueva',
    'metrosCuadradosObraNueva',
    'metrosLinealesObraNueva',
    'porcentajeObraRefaccionada',
    'metrosCuadradosObraRefaccionada',
    'metrosLinealesObraRefaccionada',
  ]),
}

export const ObraMeta: MetaModelDefinition<ObraModel.Entity> = {
  config: {
    key: 'obra',
    title: {
      singular: 'Obra',
      plural: 'Obras',
    },
    faIcon: 'fa-solid fa-tree-city',

    service: ObraService,
    refreshRate: 'medium',
    anchorField: 'nombre',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [BASIC, VARIABLES, MODALIDAD],
    edit: [BASIC, VARIABLES, MODALIDAD],
  },
}
