export enum ViewKey {
  SUB_SECRETARIAS,
  DIRECCIONES,
  DEPARTAMENTOS,
  PAIS,
  PROVINCIA,
  LOCALIDAD,
  ESTADO_OBRA,
  FIANCIAMIENTO,
  MODIFICACION_OBRA,
  PARALIZACION_OBRA,
  PROGRAMA_OBRA,
  REPRESENTANTE_EMPRESA,
  TRAMITE,
  TIPO_INSPECTOR,
  INSPECTOR,
  
}

interface Info {
  title: string
}

export const VIEW_INFO: Record<ViewKey, Info> = {
  [ViewKey.SUB_SECRETARIAS]: {
    title: 'Subsecretarías',
  },
  [ViewKey.DIRECCIONES]: {
    title: 'Direcciones',
  },
  [ViewKey.DEPARTAMENTOS]: {
    title: 'Departamentos',
  },
  [ViewKey.PAIS]: {
    title: 'País',
  },
  [ViewKey.PROVINCIA]: {
    title: 'Provincia',
  },
  [ViewKey.LOCALIDAD]: {
    title: 'Localidad',
  },
  [ViewKey.ESTADO_OBRA]: {
    title: 'Estado Obra',
  },
  [ViewKey.FIANCIAMIENTO]: {
    title: 'Financiamiento',
  },
  [ViewKey.MODIFICACION_OBRA]: {
    title: 'Modificación Obra',
  },
  [ViewKey.PARALIZACION_OBRA]: {
    title: 'Paralización Obra',
  },
  [ViewKey.PROGRAMA_OBRA]: {
    title: 'Programa Obra',
  },
  [ViewKey.REPRESENTANTE_EMPRESA]: {
    title: 'Representante Empresa',
  },
  [ViewKey.TRAMITE]: {
    title: 'Trámite',
  },
  [ViewKey.TIPO_INSPECTOR]: {
    title: 'Tipo Inspector',
  },
  [ViewKey.INSPECTOR]: {
    title: 'Inspector',
  },
}
