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
    title: 'Pais',
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
    title: 'Modificacion Obra',
  },
  [ViewKey. PARALIZACION_OBRA]: {
    title: 'Paralizacion Obra',
  },
  [ViewKey.PROGRAMA_OBRA]: {
    title: 'Programa Obra',
  },
  [ViewKey.REPRESENTANTE_EMPRESA]: {
    title: 'Representante Empresa',
  },
  [ViewKey.TRAMITE]: {
    title: 'Tramite',
  },
  [ViewKey.INSPECTOR]: {
    title: 'Inspector',
  },
}

/**export enum ViewKey {
  SUB_SECRETARIAS = 'sub-secretarias',
  DIRECCIONES = 'direcciones',
  DEPARTAMENTOS = 'departamentos',
  PAIS='pais',
  PROVINCIA='provincia',
  LOCALIDAD='localidad',
  ESTADO_OBRA='estado-obra',
  FIANCIAMIENTO='financiamiento',
  MODIFICACION_OBRA='modificacion-obra',
  PARALIZACION_OBRA='paralizacion-obra',
  PROGRAMA_OBRA='programa-obra',
  REPRESENTANTE_EMPRESA='representante-empresa',
  TRAMITE='tramite',
  INSPECTOR='inspector',
}
 */