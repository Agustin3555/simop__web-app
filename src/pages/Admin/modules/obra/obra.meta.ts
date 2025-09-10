import { select } from '../../helpers'
import { ObraService } from './obra.service'
import { ObraModel } from '.'
import { ObraProps } from './obra.props'
import { MetaModelDefinition } from '../../meta/metaModel'
import { Method } from '@/services/config'

const { propFactories, allFields } = ObraProps

const BASICO: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
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
  'tipoEstadoObra',
  'fechaInicio',
  'fechaFin',
  'plazoMeses',
  'plazoDias',
  'nomenclaturaCatastral',
  'localidades',
  'direccion',
  'lugar',
  'avanceTotal',
  'inaugurada',
  'porcentajePendienteCertificar',
  'totalPendientePago',
  'observaciones',
])

const TOTALES: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
  'balanceEconomico',
  'nuevoMonto',

  'totalCertificadoFojaMedicion',
  'totalPagadoFojaMedicion',
  'totalOrdenPagoFojaMedicion',
  'totalPendientePagoFojaMedicion',

  'totalCertificadoRedeterminacion',
  'totalPagadoRedeterminacion',
  'totalOrdenPagoRedeterminacion',
  'totalPendientePagoRedeterminacion',

  'porcentajePendienteCertificar',
  'montoPendienteCertificar',
])

const DERIVADOS: (keyof ObraModel.Entity)[] = select(allFields, 'only', [
  'representantes',
  'inspectores',
  'fojasMedicion',
  'redeterminaciones',
  'ampliaciones',
  'modificaciones',
  'paralizaciones',
  'rescisiones',
  'recepciones',
])

const fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: select(allFields, 'except', [
      ...TOTALES,
      ...DERIVADOS,
    ] as (keyof ObraModel.Entity)[]),
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      {
        fields: BASICO,
      },
      {
        key: 'modalidad',
        title: 'Modalidad',
        fields: select(allFields, 'only', [
          'obraNueva',
          'porcentajeObraNueva',
          'metrosCuadradosObraNueva',
          'metrosLinealesObraNueva',
          'observacionesObraNueva',
          'obraRefaccionada',
          'porcentajeObraRefaccionada',
          'metrosCuadradosObraRefaccionada',
          'metrosLinealesObraRefaccionada',
          'observacionesObraRefaccionada',
        ]),
      },
    ],
  },
  {
    methods: ['general'],
    fields: select(allFields, 'only', [
      'numero',
      'nombre',
      'empresa',
      'numeroExpediente',
      'fechaContratacion',
      'montoContratacion',
      'tipoFinanciamientoObra',
      'tipoProgramaObra',
      'tipoTematicaObra',
      'tipoEstadoObra',
      'fechaInicio',
      'localidades',
      'avanceTotal',
    ]),
  },
  {
    methods: ['totales'],
    fields: [
      ...select(allFields, 'only', [
        'empresa',
        'nombre',
        'localidades',
        'tipoEstadoObra',
        'avanceTotal',
        'montoContratacion',
        'fechaContratacion',
        'tipoTematicaObra',
        'tipoProgramaObra',
      ]),
      ...TOTALES,
    ] as (keyof ObraModel.Entity)[],
  },
  {
    methods: ['detalle'],
    groups: [
      {
        title: '',
        fields: select(allFields, 'only', [
          'numero',
          'nombre',
          'empresa',
          'localidades',
          'tipoTematicaObra',
          'tipoProgramaObra',
          'avanceTotal',
          'montoContratacion',
          'fechaContratacion',
          'fechaInicio',
          'plazoMeses',
          'numeroExpediente',
          'numeroResolucion',
          'anioResolucion',
          'numeroContratacion',
          'tipoContratacionObra',
          'tipoFinanciamientoObra',
          'tipoEstadoObra',
          'fechaFin',
          'plazoDias',
          'nomenclaturaCatastral',
          'direccion',
          'lugar',
          'observaciones',
        ]),
      },
      {
        key: 'totales',
        title: 'Totales',
        fields: TOTALES,
      },
      {
        key: 'derivados',
        title: 'Derivados',
        fields: DERIVADOS,
      },
    ],
  },
  {
    methods: ['planificacion-geografica'],
    fields: select(allFields, 'only', [
      'nombre',
      'empresa',
      'localidades',
      'apgs',
      'tipoTematicaObra',
      'avanceTotal',
      'montoContratacion',
      'fechaContratacion',
      'tipoEstadoObra',
      'tipoEnteObra',
      'inaugurada',
    ]),
  },
]

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
    add: [
      { fields: BASICO },
      {
        key: 'modalidad',
        title: 'Modalidad',
        fields: select(allFields, 'only', [
          'obraNueva',
          'porcentajeObraNueva',
          'metrosCuadradosObraNueva',
          'metrosLinealesObraNueva',
          'observacionesObraNueva',
          'obraRefaccionada',
          'porcentajeObraRefaccionada',
          'metrosCuadradosObraRefaccionada',
          'metrosLinealesObraRefaccionada',
          'observacionesObraRefaccionada',
        ]),
      },
    ],
    edit: [
      { fields: BASICO },
      {
        key: 'modalidad',
        title: 'Modalidad',
        fields: select(allFields, 'only', [
          'obraNueva',
          'porcentajeObraNueva',
          'metrosCuadradosObraNueva',
          'metrosLinealesObraNueva',
          'observacionesObraNueva',
          'obraRefaccionada',
          'porcentajeObraRefaccionada',
          'metrosCuadradosObraRefaccionada',
          'metrosLinealesObraRefaccionada',
          'observacionesObraRefaccionada',
        ]),
      },
    ],
  },
}
