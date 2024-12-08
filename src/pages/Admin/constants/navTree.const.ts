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
          { viewKey: ViewKey.SUB_SECRETARIAS },
          { viewKey: ViewKey.DIRECCIONES },
          { viewKey: ViewKey.DEPARTAMENTOS },
        ],
      },
      {
        title: 'Ubicacion Geográfica',
        sections: [
          { viewKey: ViewKey.PAIS },
          { viewKey: ViewKey.PROVINCIA },
          { viewKey: ViewKey.LOCALIDAD },
        ],
      },
      {
        title: 'Tipo',
        sections: [
          { viewKey: ViewKey.ESTADO_OBRA },
          { viewKey: ViewKey.FIANCIAMIENTO },
          { viewKey: ViewKey.MODIFICACION_OBRA },
          { viewKey: ViewKey.PARALIZACION_OBRA },
          { viewKey: ViewKey.PROGRAMA_OBRA },
          { viewKey: ViewKey.REPRESENTANTE_EMPRESA },
          { viewKey: ViewKey.TRAMITE },
        ],
      },
      {
        title: 'Inspector',
        sections: [
          { viewKey: ViewKey.INSPECTOR },
          { viewKey: ViewKey.TIPO_INSPECTOR },
        ],
      },
    ],
  },
]
