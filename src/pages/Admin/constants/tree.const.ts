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

      {
        title: 'Ubicación Geográfica',
        sections: [
          {
            title: 'País',
            viewKey: ViewKey.PAIS,
          },
          {
            title: 'Provincia',
            viewKey: ViewKey.PROVINCIA,            
          },
          {
            title: 'Localidad',
            viewKey: ViewKey.LOCALIDAD,
          },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          {
            title: 'Estado de la Obra',
            viewKey: ViewKey.ESTADO_OBRA,
          },
          { 
            title: 'Financiamiento',
            viewKey: ViewKey.FIANCIAMIENTO,
          },
          { 
            title: 'Modificación Obra',
            viewKey: ViewKey.MODIFICACION_OBRA,
          },
          { 
            title: 'Paralización Obra',
            viewKey: ViewKey.PARALIZACION_OBRA,
          },
          { 
            title: 'Programa Obra',
            viewKey: ViewKey.PROGRAMA_OBRA,
          },
          { 
            title: 'Representante Empresa',
            viewKey: ViewKey.REPRESENTANTE_EMPRESA,
          },
          { 
            title: 'Trámite',
            viewKey: ViewKey.TRAMITE,
          },
          { 
            title: 'Inspector',
            viewKey: ViewKey.INSPECTOR,
          },

        ]
        },
     
    ],
  },
]

