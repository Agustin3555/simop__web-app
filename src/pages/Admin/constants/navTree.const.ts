import { TableKey } from './metaModelKey.const'

export type SectionNode =
  | {
      tableKey: TableKey
      title?: never
      sections?: never
    }
  | {
      tableKey?: never
      title: string
      sections: SectionNode[]
    }

export const TREE: SectionNode[] = [
  { tableKey: 'pais' },
  { tableKey: 'provincia' },

  // {
  //   title: 'Sobre Obras',
  //   sections: [
  //     { tableKey: 'obra' },
  //     {
  //       title: 'Eventos',
  //       sections: [
  //         { tableKey: 'fojaMedicion' },
  //         { tableKey: 'pagoCertificacion' },
  //         { tableKey: 'redeterminacion' },
  //         { tableKey: 'ampliacion' },
  //         { tableKey: 'modificacion' },
  //         { tableKey: 'paralizacion' },
  //         { tableKey: 'rescision' },
  //         { tableKey: 'recepcion' },
  //       ],
  //     },
  //     {
  //       title: 'Actores',
  //       sections: [
  //         { tableKey: 'representanteObra' },
  //         { tableKey: 'inspectorObra' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Sobre Empresas',
  //   sections: [
  //     { tableKey: 'empresa' },
  //     {
  //       title: 'Actores',
  //       sections: [{ tableKey: 'representanteEmpresa' }],
  //     },
  //   ],
  // },
  // {
  //   title: 'Ubicación',
  //   sections: [
  //     { tableKey: 'pais' },
  //     { tableKey: 'provincia' },
  //     { tableKey: 'apg' },
  //     { tableKey: 'departamento' },
  //     { tableKey: 'localidad' },
  //   ],
  // },
  // {
  //   title: 'Actores',
  //   sections: [{ tableKey: 'representante' }, { tableKey: 'inspector' }],
  // },
  {
    title: 'Tipos',
    sections: [
      { tableKey: 'tipoNivelArea' },
      { tableKey: 'tipoProfesion' },
      { tableKey: 'tipoRepresentante' },
      { tableKey: 'tipoInspector' },

      { tableKey: 'tipoEnteObra' },
      { tableKey: 'tipoContratacionObra' },
      { tableKey: 'tipoOrigenFinanciamientoObra' },
      { tableKey: 'tipoFinanciamientoObra' },
      { tableKey: 'tipoProgramaObra' },
      { tableKey: 'tipoTematicaObra' },
      { tableKey: 'tipoEstadoObra' },

      { tableKey: 'tipoParalizacion' },
      { tableKey: 'tipoRescision' },
      { tableKey: 'tipoRedeterminacion' },
      { tableKey: 'tipoRecepcion' },
      { tableKey: 'tipoModificacion' },
    ],
  },
  // { tableKey: 'area' },
]

// TODO: constantes a revivir
