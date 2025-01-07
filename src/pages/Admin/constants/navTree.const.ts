import { Scheme } from '../services/config'
import {
  DepartamentoModel,
  DireccionModel,
  EmpresaModel,
  InspectorModel,
  InspectorObraModel,
  LocalidadModel,
  ObraModel,
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
            ],
          },
        ],
      },
    ],
  },
  { scheme: InspectorModel.scheme },
  { scheme: RepresentanteModel.scheme },
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
    ],
  },
]

// { scheme: ViewKey.MODIFICACION_OBRA },
// { scheme: ViewKey.PARALIZACION_OBRA },
// { scheme: ViewKey.TRAMITE },

// { scheme: ViewKey.FOJA_MEDICION },
// { scheme: ViewKey.CERTIFICACION },
// { scheme: ViewKey.PAGO_CERTIFICACION },
