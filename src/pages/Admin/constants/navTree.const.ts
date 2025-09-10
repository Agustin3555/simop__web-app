import { asAuxView, asModuleView } from './views.const'

export interface SectionNode {
  viewKey?: string
  title?: string
  sections?: SectionNode[]
}

export const TREE: SectionNode[] = [
  {
    title: 'Tablero de Gestión',
    sections: [
      { viewKey: asAuxView('planificacionGeografica') },
      { viewKey: asAuxView('obraDetalle') },
    ],
  },
  {
    title: 'Sobre Obras',
    sections: [
      { viewKey: asModuleView('obra') },
      {
        title: 'Eventos',
        sections: [
          { viewKey: asModuleView('fojaMedicion') },
          { viewKey: asModuleView('pagoCertificacion') },
          { viewKey: asModuleView('redeterminacion') },
          { viewKey: asModuleView('ampliacion') },
          { viewKey: asModuleView('modificacion') },
          { viewKey: asModuleView('paralizacion') },
          { viewKey: asModuleView('rescision') },
          { viewKey: asModuleView('recepcion') },
        ],
      },
      {
        title: 'Actores',
        sections: [
          { viewKey: asModuleView('representanteObra') },
          { viewKey: asModuleView('inspectorObra') },
        ],
      },
    ],
  },
  {
    title: 'Sobre Empresas',
    sections: [
      { viewKey: asModuleView('empresa') },
      {
        title: 'Actores',
        sections: [{ viewKey: asModuleView('representanteEmpresa') }],
      },
    ],
  },
  {
    title: 'Ubicación',
    sections: [
      { viewKey: asModuleView('pais') },
      { viewKey: asModuleView('provincia') },
      { viewKey: asModuleView('apg') },
      { viewKey: asModuleView('departamento') },
      { viewKey: asModuleView('localidad') },
    ],
  },
  {
    title: 'Actores',
    sections: [
      { viewKey: asModuleView('representante') },
      { viewKey: asModuleView('inspector') },
    ],
  },
  {
    title: 'Tipos',
    sections: [
      { viewKey: asModuleView('tipoNivelArea') },
      { viewKey: asModuleView('tipoProfesion') },
      { viewKey: asModuleView('tipoRepresentante') },
      { viewKey: asModuleView('tipoInspector') },

      { viewKey: asModuleView('tipoEnteObra') },
      { viewKey: asModuleView('tipoContratacionObra') },
      { viewKey: asModuleView('tipoOrigenFinanciamientoObra') },
      { viewKey: asModuleView('tipoFinanciamientoObra') },
      { viewKey: asModuleView('tipoProgramaObra') },
      { viewKey: asModuleView('tipoTematicaObra') },
      { viewKey: asModuleView('tipoEstadoObra') },

      { viewKey: asModuleView('tipoParalizacion') },
      { viewKey: asModuleView('tipoRescision') },
      { viewKey: asModuleView('tipoRedeterminacion') },
      { viewKey: asModuleView('tipoRecepcion') },
      { viewKey: asModuleView('tipoModificacion') },
    ],
  },
  { viewKey: asModuleView('area') },
]
