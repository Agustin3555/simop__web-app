import { EmpresaModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const EmpresaColumns = toColumnDefsWithShared<EmpresaModel.Entity>({
  cuit: {
    type: 'number',
    title: 'CUIT',
    isBig: true,
  },
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
  direccion: {
    type: 'text',
    title: 'Dirección declarada',
  },
  numeroContacto: {
    type: 'number',
    title: 'Número de contacto',
    isBig: true,
  },
  email: {
    type: 'text',
    title: 'Email',
    domain: 'email',
  },
  pais: {
    type: 'ref',
    tableRefKey: 'pais',
  },
  provincia: {
    type: 'ref',
    tableRefKey: 'provincia',
  },
  localidad: {
    type: 'ref',
    tableRefKey: 'localidad',
  },
})
