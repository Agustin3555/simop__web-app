import { ObraModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const ObraColumns = toColumnDefsWithShared<ObraModel.Entity>({
  numero: {
    type: 'number',
    title: 'Número De Obra',
    isBig: true,
  },
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
  tipoEnteObra: {
    type: 'ref',
    tableRefKey: 'tipoEnteObra',
  },
  solicitante: {
    type: 'text',
    title: 'Solicitante',
  },
  fechaPedido: {
    type: 'datetime',
    title: 'Fecha de Pedido',
  },
  empresa: {
    type: 'ref',
    tableRefKey: 'empresa',
  },
  localidades: {
    type: 'ref',
    tableRefKey: 'localidad',
    isMultiple: true,
  },
  apgs: {
    type: 'ref',
    tableRefKey: 'apg',
    isMultiple: true,
    inputConfig: {
      isHidden: true,
    },
  },
  tipoEstadoObra: {
    type: 'ref',
    tableRefKey: 'tipoEstadoObra',
  },
  avanceTotal: {
    type: 'number',
    title: 'Avance Acumulado',
    sub: '%',
    isDecimal: true,
  },
  fechaContratacion: {
    type: 'datetime',
    title: 'Fecha de Contratación',
  },
  visitable: {
    type: 'boolean',
    title: 'Visitable',
    allowNull: true,
  },
  inaugurable: {
    type: 'boolean',
    title: 'Inaugurable',
    allowNull: true,
  },
  inaugurada: {
    type: 'boolean',
    title: 'Inaugurada',
    allowNull: true,
  },
  gestion2023: {
    type: 'boolean',
    title: 'Gestión 2023 - 2027',
  },
  montoContratacion: {
    type: 'number',
    title: 'Monto de Contratación',
    pre: '$',
    isDecimal: true,
    isMoney: true,
    isBig: true,
  },
  nuevoMonto: {
    type: 'number',
    title: 'Nuevo Monto de Contratación',
    pre: '$',
    isDecimal: true,
    isMoney: true,
    isBig: true,
    inputConfig: {
      isHidden: true,
    },
  },
  porcentajePendienteCertificar: {
    type: 'number',
    title: 'Porcentaje Pendiente a Certificar',
    sub: '%',
    isDecimal: true,
    inputConfig: {
      isHidden: true,
    },
  },
  montoPendienteCertificarActualizado: {
    type: 'number',
    title: 'Monto Pendiente a Certificar Actualizado',
    pre: '$',
    isDecimal: true,
    isMoney: true,
    isBig: true,
    inputConfig: {
      isHidden: true,
    },
  },
  presupuestoProximoAnio: {
    type: 'number',
    title: 'Presupuesto actualizado 2027 (+20%)',
    pre: '$',
    isDecimal: true,
    isMoney: true,
    isBig: true,
    inputConfig: {
      isHidden: true,
    },
  },
  tipoTematicaObra: {
    type: 'ref',
    tableRefKey: 'tipoTematicaObra',
  },
  tipoProgramaObra: {
    type: 'ref',
    tableRefKey: 'tipoProgramaObra',
  },
  numeroExpediente: {
    type: 'text',
    title: 'Número de Expediente de Contrato',
  },
  numeroResolucion: {
    type: 'text',
    title: 'Número de Resolución',
  },
  anioResolucion: {
    type: 'number',
    title: 'Año de Resolución',
  },
  numeroContratacion: {
    type: 'text',
    title: 'Número de Contratación',
  },
  tipoContratacionObra: {
    type: 'ref',
    tableRefKey: 'tipoContratacionObra',
  },
  tipoOrigenFinanciamientoObra: {
    type: 'ref',
    tableRefKey: 'tipoOrigenFinanciamientoObra',
  },
  tipoFinanciamientoObra: {
    type: 'ref',
    tableRefKey: 'tipoFinanciamientoObra',
  },
  fechaInicio: {
    type: 'datetime',
    title: 'Fecha de Inicio',
  },
  fechaFin: {
    type: 'datetime',
    title: 'Finaliza en',
  },
  plazoMeses: {
    type: 'number',
    title: 'Plazo en Meses',
  },
  plazoDias: {
    type: 'number',
    title: 'Plazo en Días',
  },
  nomenclaturaCatastral: {
    type: 'text',
    title: 'Nomenclatura Catastral',
  },
  direccion: {
    type: 'text',
    title: 'Dirección',
  },
  lugar: {
    type: 'text',
    title: 'Lugar',
    domain: 'longText',
  },
  observaciones: {
    type: 'text',
    title: 'Observaciones generales',
    domain: 'longText',
  },
  obraNueva: {
    type: 'boolean',
    title: 'Tiene cartel',
  },
  porcentajeObraNueva: {
    type: 'number',
    title: 'Porcentaje de obra nueva',
    isDecimal: true,
    sub: '%',
  },
  metrosCuadradosObraNueva: {
    type: 'number',
    title: 'm² (metros cuadrados) de obra nueva',
    isDecimal: true,
    sub: 'm²',
  },
  metrosLinealesObraNueva: {
    type: 'number',
    title: 'm (metros lineales) de obra nueva',
    isDecimal: true,
    sub: 'm',
  },
  observacionesObraNueva: {
    type: 'text',
    title: 'Estado físico',
    domain: 'longText',
  },
  obraRefaccionada: {
    type: 'boolean',
    title: 'Tiene placa',
  },
  porcentajeObraRefaccionada: {
    type: 'number',
    title: 'Porcentaje de obra refaccionada',
    sub: '%',
    isDecimal: true,
  },
  metrosCuadradosObraRefaccionada: {
    type: 'number',
    title: 'm² (metros cuadrados) de obra refaccionada',
    sub: 'm²',
    isDecimal: true,
  },
  metrosLinealesObraRefaccionada: {
    type: 'number',
    title: 'm (metros lineales) de obra refaccionada',
    sub: 'm',
    isDecimal: true,
  },
  observacionesObraRefaccionada: {
    type: 'text',
    title: 'Geolocalización',
    domain: 'url',
  },
  totalPendientePago: {
    type: 'number',
    title: 'Total Pendiente de Pago',
    pre: '$',
    isDecimal: true,
    isMoney: true,
    isBig: true,
  },
  inspectorTitular: {
    type: 'ref',
    tableRefKey: 'inspector',
    inputConfig: {
      isHidden: true,
    },
  },
})
