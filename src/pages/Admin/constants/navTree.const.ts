import { Scheme } from '../services/config'
import {
  CertificacionModel,
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
} from '../models'

export interface SectionNode {
  title?: string
  sections?: SectionNode[]
  scheme?: Scheme
}

export const TREE: SectionNode[] = [
  {
    title: 'Administración',
    sections: [
      {
        title: 'Organigrama',
        sections: [
          { scheme: SubSecretariaModel.scheme },
          { scheme: DireccionModel.scheme },
          { scheme: DepartamentoModel.scheme },
        ],
      },
      {
        title: 'Ubicación Geográfica',
        sections: [
          { scheme: PaisModel.scheme },
          { scheme: ProvinciaModel.scheme },
          { scheme: LocalidadModel.scheme },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          { scheme: TipoProfesionModel.scheme },
          { scheme: TipoRepresentanteModel.scheme },
          { scheme: TipoInspectorModel.scheme },
          {
            title: 'Obras',
            sections: [
              { scheme: TipoContratacionObraModel.scheme },
              { scheme: TipoFinanciamientoObraModel.scheme },
              { scheme: TipoProgramaObraModel.scheme },
              { scheme: TipoTematicaObraModel.scheme },
              { scheme: TipoEstadoObraModel.scheme },
              { scheme: TipoRescisionModel.scheme },
              { scheme: TipoRedeterminacionModel.scheme },
              { scheme: TipoRecepcionModel.scheme },
              { scheme: TipoModificacionModel.scheme },
            ],
          },
        ],
      },
      { scheme: InspectorModel.scheme },
      { scheme: RepresentanteModel.scheme },
    ],
  },
  {
    title: 'Empresas',
    sections: [
      { scheme: EmpresaModel.scheme },
      { scheme: RepresentanteEmpresaModel.scheme },
    ],
  },
  {
    title: 'Obras',
    sections: [
      { scheme: ObraModel.scheme },
      { scheme: RepresentanteObraModel.scheme },
      { scheme: InspectorObraModel.scheme },
      { scheme: FojaMedicionModel.scheme },
      { scheme: CertificacionModel.scheme },
      { scheme: PagoCertificacionModel.scheme },
      { scheme: RedeterminacionModel.scheme },
      { scheme: AmpliacionModel.scheme },
      { scheme: ModificacionModel.scheme },
    ],
  },
]
