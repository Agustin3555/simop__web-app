import {
  DepartamentoModel,
  DireccionModel,
  EmpresaModel,
  InspectorModel,
  InspectorObraModel,
  LocalidadModel,
  ObraModel,
  PagoCertificacionModel,
  PaisModel,
  ProvinciaModel,
  RepresentanteEmpresaModel,
  RepresentanteModel,
  RepresentanteObraModel,
  SubSecretariaModel,
  TipoContratacionObraModel,
  TipoEstadoObraModel,
  TipoFinanciamientoObraModel,
  TipoInspectorModel,
  TipoParalizacionModel,
  TipoProfesionModel,
  TipoProgramaObraModel,
  TipoRepresentanteModel,
  TipoTematicaObraModel,
  TipoModificacionModel,
  TipoRecepcionModel,
  TipoRedeterminacionModel,
  TipoRescisionModel,
  FojaMedicionModel,
  AmpliacionModel,
  RedeterminacionModel,
  ModificacionModel,
  ParalizacionModel,
  RescisionModel,
  RecepcionModel,
} from '../models'

export interface SectionNode {
  viewKey?: string
  title?: string
  sections?: SectionNode[]
}

export const TREE: SectionNode[] = [
  {
    title: 'Administración',
    sections: [
      {
        title: 'Organigrama',
        sections: [
          {
            viewKey: SubSecretariaModel.metaModel.key,
            title: SubSecretariaModel.metaModel.title.plural,
          },
          {
            viewKey: DireccionModel.metaModel.key,
            title: DireccionModel.metaModel.title.plural,
          },
          {
            viewKey: DepartamentoModel.metaModel.key,
            title: DepartamentoModel.metaModel.title.plural,
          },
        ],
      },
      {
        title: 'Ubicación Geográfica',
        sections: [
          {
            viewKey: PaisModel.metaModel.key,
            title: PaisModel.metaModel.title.plural,
          },
          {
            viewKey: ProvinciaModel.metaModel.key,
            title: ProvinciaModel.metaModel.title.plural,
          },
          {
            viewKey: LocalidadModel.metaModel.key,
            title: LocalidadModel.metaModel.title.plural,
          },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          {
            viewKey: TipoProfesionModel.metaModel.key,
            title: TipoProfesionModel.metaModel.title.plural,
          },
          {
            viewKey: TipoRepresentanteModel.metaModel.key,
            title: TipoRepresentanteModel.metaModel.title.plural,
          },
          {
            viewKey: TipoInspectorModel.metaModel.key,
            title: TipoInspectorModel.metaModel.title.plural,
          },
          {
            title: 'Obras',
            sections: [
              {
                viewKey: TipoContratacionObraModel.metaModel.key,
                title: TipoContratacionObraModel.metaModel.title.plural,
              },
              {
                viewKey: TipoFinanciamientoObraModel.metaModel.key,
                title: TipoFinanciamientoObraModel.metaModel.title.plural,
              },
              {
                viewKey: TipoParalizacionModel.metaModel.key,
                title: TipoParalizacionModel.metaModel.title.plural,
              },
              {
                viewKey: TipoProgramaObraModel.metaModel.key,
                title: TipoProgramaObraModel.metaModel.title.plural,
              },
              {
                viewKey: TipoTematicaObraModel.metaModel.key,
                title: TipoTematicaObraModel.metaModel.title.plural,
              },
              {
                viewKey: TipoEstadoObraModel.metaModel.key,
                title: TipoEstadoObraModel.metaModel.title.plural,
              },
              {
                viewKey: TipoRescisionModel.metaModel.key,
                title: TipoRescisionModel.metaModel.title.plural,
              },
              {
                viewKey: TipoRedeterminacionModel.metaModel.key,
                title: TipoRedeterminacionModel.metaModel.title.plural,
              },
              {
                viewKey: TipoRecepcionModel.metaModel.key,
                title: TipoRecepcionModel.metaModel.title.plural,
              },
              {
                viewKey: TipoModificacionModel.metaModel.key,
                title: TipoModificacionModel.metaModel.title.plural,
              },
            ],
          },
        ],
      },
      {
        viewKey: InspectorModel.metaModel.key,
        title: InspectorModel.metaModel.title.plural,
      },
      {
        viewKey: RepresentanteModel.metaModel.key,
        title: RepresentanteModel.metaModel.title.plural,
      },
    ],
  },
  {
    title: 'Empresas',
    sections: [
      {
        viewKey: EmpresaModel.metaModel.key,
        title: EmpresaModel.metaModel.title.plural,
      },
      {
        viewKey: RepresentanteEmpresaModel.metaModel.key,
        title: RepresentanteEmpresaModel.metaModel.title.plural,
      },
    ],
  },
  {
    title: 'Obras',
    sections: [
      {
        viewKey: ObraModel.metaModel.key,
        title: 'Obra Básica',
      },
      {
        viewKey: RepresentanteObraModel.metaModel.key,
        title: RepresentanteObraModel.metaModel.title.plural,
      },
      {
        viewKey: InspectorObraModel.metaModel.key,
        title: InspectorObraModel.metaModel.title.plural,
      },
      {
        viewKey: FojaMedicionModel.metaModel.key,
        title: FojaMedicionModel.metaModel.title.plural,
      },
      {
        viewKey: PagoCertificacionModel.metaModel.key,
        title: PagoCertificacionModel.metaModel.title.plural,
      },
      {
        viewKey: RedeterminacionModel.metaModel.key,
        title: RedeterminacionModel.metaModel.title.plural,
      },
      {
        viewKey: AmpliacionModel.metaModel.key,
        title: AmpliacionModel.metaModel.title.plural,
      },
      {
        viewKey: ModificacionModel.metaModel.key,
        title: ModificacionModel.metaModel.title.plural,
      },
      {
        viewKey: ParalizacionModel.metaModel.key,
        title: ParalizacionModel.metaModel.title.plural,
      },
      {
        viewKey: RescisionModel.metaModel.key,
        title: RescisionModel.metaModel.title.plural,
      },
      {
        viewKey: RecepcionModel.metaModel.key,
        title: RecepcionModel.metaModel.title.plural,
      },
    ],
  },
  {
    title: 'Tablero de Gestión',
    sections: [
      {
        viewKey: 'obraGeneral',
        title: 'Obra Básica General',
      },
      {
        viewKey: 'obraTotales',
        title: 'Totales de Obra',
      },
      {
        viewKey: 'obraDetalle',
        title: 'Detalle de Obra Básica',
      },
    ],
  },
]
