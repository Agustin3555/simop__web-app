import { ObraService } from './obra.service'
import { ObraColumns } from './obra.columns'
import { createTableDef } from '@/shared/core/table.helper'

export const ObraTable = createTableDef({
  key: 'obra',
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },
  classIcon: 'fa-solid fa-tree-city',
  columnDefs: ObraColumns,
  anchorColumnKey: 'nombre',
  mutationColumnGroups: [
    {
      columnKeys: [
        'nombre',
        'tipoEnteObra',
        'solicitante',
        'fechaPedido',
        'empresa',
        'inspectorTitular',
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
        'apgs',
        'direccion',
        'lugar',
        'observacionesObraRefaccionada',
        'porcentajePendienteCertificar',
        'observaciones',
      ],
    },
    {
      title: 'Variables',
      columnKeys: [
        'avanceTotal',
        'tipoEstadoObra',
        'observacionesObraNueva',
        'fechaFin',
        'visitable',
        'inaugurable',
        'inaugurada',
        'obraNueva',
        'obraRefaccionada',
      ],
    },
    {
      title: 'Modalidad',
      columnKeys: [
        'porcentajeObraNueva',
        'metrosCuadradosObraNueva',
        'metrosLinealesObraNueva',
        'porcentajeObraRefaccionada',
        'metrosCuadradosObraRefaccionada',
        'metrosLinealesObraRefaccionada',
      ],
    },
  ],
  services: ObraService,
})
