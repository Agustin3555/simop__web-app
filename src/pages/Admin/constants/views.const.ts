export enum ViewKey {
  SUB_SECRETARIAS,
  DIRECCIONES,
  DEPARTAMENTOS,
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
}
