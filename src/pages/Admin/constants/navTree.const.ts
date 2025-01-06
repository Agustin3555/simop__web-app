import { Scheme } from '../services/config'
import // DepartamentoModel,
// DireccionModel,
// EmpresaModel,
// InspectorModel,
// LocalidadModel,
// PaisModel,
// ProvinciaModel,
// RepresentanteEmpresaModel,
// RepresentanteModel,
// RepresentanteObraModel,
// SubSecretariaModel,
// TipoContratacionObraModel,
// TipoEstadoObraModel,
// TipoFinanciamientoObraModel,
// TipoInspectorModel,
// TipoProfesionModel,
// TipoProgramaObraModel,
// TipoRepresentanteModel,
// TipoTematicaObraModel,
'../models'

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
          // { scheme: SubSecretariaModel.scheme },
          // { scheme: DireccionModel.scheme },
          // { scheme: DepartamentoModel.scheme },
        ],
      },
      // {
      //   title: 'Ubicación Geográfica',
      //   sections: [
      //     { scheme: PaisModel.scheme },
      //     { scheme: ProvinciaModel.scheme },
      //     { scheme: LocalidadModel.scheme },
      //   ],
      // },
      // {
      //   title: 'Tipos comunes',
      //   sections: [{ scheme: TipoProfesionModel.scheme }],
      // },
    ],
  },
  // {
  //   title: 'Inspectores',
  //   sections: [
  //     { scheme: InspectorModel.scheme },
  //     { scheme: TipoInspectorModel.scheme },
  //   ],
  // },
  // {
  //   title: 'Representantes',
  //   sections: [
  //     { scheme: RepresentanteModel.scheme },
  //     { scheme: TipoRepresentanteModel.scheme },
  //   ],
  // },
  // {
  //   title: 'Empresas',
  //   sections: [
  //     { scheme: EmpresaModel.scheme },
  //     { scheme: RepresentanteEmpresaModel.scheme },
  //   ],
  // },
  // {
  //   title: 'Obras',
  //   sections: [
  //     { scheme: RepresentanteObraModel.scheme },
  //     { scheme: TipoContratacionObraModel.scheme },
  //     { scheme: TipoFinanciamientoObraModel.scheme },
  //     { scheme: TipoProgramaObraModel.scheme },
  //     { scheme: TipoTematicaObraModel.scheme },
  //     { scheme: TipoEstadoObraModel.scheme },
  //   ],
  // },
]

// { scheme: ViewKey.MODIFICACION_OBRA },
// { scheme: ViewKey.PARALIZACION_OBRA },
// { scheme: ViewKey.TRAMITE },

// { scheme: ViewKey.OBRA },
// { scheme: ViewKey.FOJA_MEDICION },
// { scheme: ViewKey.CERTIFICACION },
// { scheme: ViewKey.PAGO_CERTIFICACION },
