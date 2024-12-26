export enum ViewKey {
  SUB_SECRETARIA,
  DIRECCION,
  DEPARTAMENTO,
  PAIS,
  PROVINCIA,
  LOCALIDAD,
  TIPO_CONTRATACION_OBRA,
  TIPO_ESTADO_OBRA,
  TIPO_FINANCIAMIENTO_OBRA,
  MODIFICACION_OBRA,
  PARALIZACION_OBRA,
  TIPO_PROGRAMA_OBRA,
  TIPO_TEMATICA_OBRA,
  TRAMITE,
  TIPO_PROFESION,
  TIPO_INSPECTOR,
  TIPO_REPRESENTANTE_EMPRESA,
  INSPECTOR,
  REPRESENTANTE_EMPRESA,
  EMPRESA,
  OBRA,
  FOJA_MEDICION,
  CERTIFICACION,
  PAGO_CERTIFICACION,
}

interface Info {
  title: string
}

export const VIEW_INFO: Record<ViewKey, Info> = {
  [ViewKey.SUB_SECRETARIA]: {
    title: 'Subsecretarías',
  },
  [ViewKey.DIRECCION]: {
    title: 'Direcciones',
  },
  [ViewKey.DEPARTAMENTO]: {
    title: 'Departamentos',
  },
  [ViewKey.PAIS]: {
    title: 'Países',
  },
  [ViewKey.PROVINCIA]: {
    title: 'Provincias',
  },
  [ViewKey.LOCALIDAD]: {
    title: 'Localidades',
  },
  [ViewKey.TIPO_CONTRATACION_OBRA]: {
    title: 'Contrataciones de Obra',
  },
  [ViewKey.TIPO_ESTADO_OBRA]: {
    title: 'Estados de Obra',
  },
  [ViewKey.TIPO_FINANCIAMIENTO_OBRA]: {
    title: 'Financiamientos',
  },
  [ViewKey.MODIFICACION_OBRA]: {
    title: 'Modificaciones de Obra',
  },
  [ViewKey.PARALIZACION_OBRA]: {
    title: 'Paralizaciones de Obra',
  },
  [ViewKey.TIPO_PROGRAMA_OBRA]: {
    title: 'Programas de Obra',
  },
  [ViewKey.TIPO_TEMATICA_OBRA]: {
    title: 'Temáticas de Obra',
  },
  [ViewKey.TIPO_REPRESENTANTE_EMPRESA]: {
    title: 'Representantes de Empresa',
  },
  [ViewKey.TRAMITE]: {
    title: 'Trámites',
  },
  [ViewKey.TIPO_PROFESION]: {
    title: 'Profesiones',
  },
  [ViewKey.TIPO_INSPECTOR]: {
    title: 'Tipos de Inspector',
  },
  [ViewKey.INSPECTOR]: {
    title: 'Datos de Inspectores',
  },
  [ViewKey.REPRESENTANTE_EMPRESA]: {
    title: 'Representantes de Empresa',
  },
  [ViewKey.EMPRESA]: {
    title: 'Datos de Empresa',
  },
  [ViewKey.OBRA]: {
    title: 'Datos de Obra',
  },
  [ViewKey.FOJA_MEDICION]: {
    title: 'Foja de medicón',
  },
  [ViewKey.CERTIFICACION]: {
    title: 'Certificación',
  },
  [ViewKey.PAGO_CERTIFICACION]: {
    title: 'Pago Certificación',
  },
}
