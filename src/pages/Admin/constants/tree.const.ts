import { ViewKey } from '../enums'

export interface SectionNode {
  title: string
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
          {
            title: 'Subsecretarías',
            viewKey: ViewKey.SUB_SECRETARIAS,
          },
          {
            title: 'Direcciones',
            viewKey: ViewKey.DIRECCIONES,
          },
          {
            title: 'Departamentos',
            viewKey: ViewKey.DEPARTAMENTOS,
          },
        ],
      },
    ],
  },
]
