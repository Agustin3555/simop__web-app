export enum ViewKey {
  SUB_SECRETARIA,
  DIRECCION,
  DEPARTAMENTO,
  PAIS,
  PROVINCIA,
  LOCALIDAD,
  ESTADO_OBRA,
  FINANCIAMIENTO,
  MODIFICACION_OBRA,
  PARALIZACION_OBRA,
  PROGRAMA_OBRA,
  REPRESENTANTE_EMPRESA,
  TRAMITE,
  TIPO_PROFESION,
  TIPO_INSPECTOR,
  INSPECTOR,
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
  [ViewKey.ESTADO_OBRA]: {
    title: 'Estados de Obra',
  },
  [ViewKey.FINANCIAMIENTO]: {
    title: 'Financiamientos',
  },
  [ViewKey.MODIFICACION_OBRA]: {
    title: 'Modificaciones de Obra',
  },
  [ViewKey.PARALIZACION_OBRA]: {
    title: 'Paralizaciones de Obra',
  },
  [ViewKey.PROGRAMA_OBRA]: {
    title: 'Programas de Obra',
  },
  [ViewKey.REPRESENTANTE_EMPRESA]: {
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
    title: 'Inspectores',
  },
}
