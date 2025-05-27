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
          { viewKey: SubSecretariaMeta.key },
          { viewKey: DireccionMeta.key },
          { viewKey: DepartamentoMeta.key },
        ],
      },
      {
        title: 'Ubicación Geográfica',
        sections: [
          { viewKey: PaisMeta.key },
          { viewKey: ProvinciaMeta.key },
          { viewKey: LocalidadMeta.key },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          { viewKey: TipoProfesionMeta.key },
          { viewKey: TipoRepresentanteMeta.key },
          { viewKey: TipoInspectorMeta.key },
          {
            title: 'Obras',
            sections: [
              { viewKey: TipoContratacionObraMeta.key },
              { viewKey: TipoFinanciamientoObraMeta.key },
              { viewKey: TipoParalizacionMeta.key },
              { viewKey: TipoProgramaObraMeta.key },
              { viewKey: TipoTematicaObraMeta.key },
              { viewKey: TipoEstadoObraMeta.key },
              { viewKey: TipoRescisionMeta.key },
              { viewKey: TipoRedeterminacionMeta.key },
              { viewKey: TipoRecepcionMeta.key },
              { viewKey: TipoModificacionMeta.key },
            ],
          },
        ],
      },
      { viewKey: InspectorMeta.key },
      { viewKey: RepresentanteMeta.key },
    ],
  },
  {
    title: 'Empresas',
    sections: [
      { viewKey: EmpresaMeta.key },
      { viewKey: RepresentanteEmpresaMeta.key },
    ],
  },
  {
    title: 'Obras',
    sections: [
      { viewKey: ObraMeta.key },
      { viewKey: RepresentanteObraMeta.key },
      { viewKey: InspectorObraMeta.key },
      { viewKey: FojaMedicionMeta.key },
      { viewKey: PagoCertificacionMeta.key },
      { viewKey: RedeterminacionMeta.key },
      { viewKey: AmpliacionMeta.key },
      { viewKey: ModificacionMeta.key },
      { viewKey: ParalizacionMeta.key },
      { viewKey: RescisionMeta.key },
      { viewKey: RecepcionMeta.key },
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
