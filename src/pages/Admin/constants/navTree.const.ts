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
          { viewKey: SubSecretariaModel.metaModel.key },
          { viewKey: DireccionModel.metaModel.key },
          { viewKey: DepartamentoModel.metaModel.key },
        ],
      },
      {
        title: 'Ubicación Geográfica',
        sections: [
          { viewKey: PaisModel.metaModel.key },
          { viewKey: ProvinciaModel.metaModel.key },
          { viewKey: LocalidadModel.metaModel.key },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          { viewKey: TipoProfesionModel.metaModel.key },
          { viewKey: TipoRepresentanteModel.metaModel.key },
          { viewKey: TipoInspectorModel.metaModel.key },
          {
            title: 'Obras',
            sections: [
              { viewKey: TipoContratacionObraModel.metaModel.key },
              { viewKey: TipoFinanciamientoObraModel.metaModel.key },
              { viewKey: TipoParalizacionModel.metaModel.key },
              { viewKey: TipoProgramaObraModel.metaModel.key },
              { viewKey: TipoTematicaObraModel.metaModel.key },
              { viewKey: TipoEstadoObraModel.metaModel.key },
              { viewKey: TipoRescisionModel.metaModel.key },
              { viewKey: TipoRedeterminacionModel.metaModel.key },
              { viewKey: TipoRecepcionModel.metaModel.key },
              { viewKey: TipoModificacionModel.metaModel.key },
            ],
          },
        ],
      },
      { viewKey: InspectorModel.metaModel.key },
      { viewKey: RepresentanteModel.metaModel.key },
    ],
  },
  {
    title: 'Empresas',
    sections: [
      { viewKey: EmpresaModel.metaModel.key },
      { viewKey: RepresentanteEmpresaModel.metaModel.key },
    ],
  },
  {
    title: 'Obras',
    sections: [
      { viewKey: ObraModel.metaModel.key },
      { viewKey: RepresentanteObraModel.metaModel.key },
      { viewKey: InspectorObraModel.metaModel.key },
      { viewKey: FojaMedicionModel.metaModel.key },
      { viewKey: PagoCertificacionModel.metaModel.key },
      { viewKey: RedeterminacionModel.metaModel.key },
      { viewKey: AmpliacionModel.metaModel.key },
      { viewKey: ModificacionModel.metaModel.key },
      { viewKey: ParalizacionModel.metaModel.key },
      { viewKey: RescisionModel.metaModel.key },
      { viewKey: RecepcionModel.metaModel.key },
    ],
  },
  {
    title: 'Tablero de Gestión',
    sections: [
      { viewKey: 'obraGeneral' },
      { viewKey: 'obraTotales' },
      { viewKey: 'obraDetalle' },
    ],
  },
]
