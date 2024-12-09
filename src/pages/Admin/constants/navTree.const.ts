import { ViewKey } from './views.const'

export interface SectionNode {
  title?: string
  sections?: SectionNode[]
  viewKey?: ViewKey
}

export const TREE: SectionNode[] = [
  {
    title: 'Administración',
    sections: [
      {
        title: 'Organigrama',
        sections: [
          { viewKey: ViewKey.SUB_SECRETARIA },
          { viewKey: ViewKey.DIRECCION },
          { viewKey: ViewKey.DEPARTAMENTO },
        ],
      },
      {
        title: 'Ubicación Geográfica',
        sections: [
          { viewKey: ViewKey.PAIS },
          { viewKey: ViewKey.PROVINCIA },
          { viewKey: ViewKey.LOCALIDAD },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          { viewKey: ViewKey.ESTADO_OBRA },
          { viewKey: ViewKey.FINANCIAMIENTO },
          { viewKey: ViewKey.MODIFICACION_OBRA },
          { viewKey: ViewKey.PARALIZACION_OBRA },
          { viewKey: ViewKey.PROGRAMA_OBRA },
          { viewKey: ViewKey.TIPO_REPRESENTANTE_EMPRESA },
          { viewKey: ViewKey.TRAMITE },
          { viewKey: ViewKey.TIPO_PROFESION },
        ],
      },
      {
        title: 'Sobre Inspectores',
        sections: [
          { viewKey: ViewKey.TIPO_INSPECTOR },
          { viewKey: ViewKey.INSPECTOR },
        ],
      },
    ],
  },
  {
    title: 'Empresas',
    sections: [
      { viewKey: ViewKey.DATOS },
      { viewKey: ViewKey.REPRESENTANTE_EMPRESA},
    ],
  },
]
