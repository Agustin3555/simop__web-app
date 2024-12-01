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
    ],
  },
]
