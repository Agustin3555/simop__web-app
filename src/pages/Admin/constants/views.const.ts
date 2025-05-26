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
import { MetaModel } from '../services/config'

const VIEWS_BASE: Record<
  string,
  { metaModel?: MetaModel; title?: string; faIcon?: string }
> = {
  [SubSecretariaModel.metaModel.key]: {
    metaModel: SubSecretariaModel.metaModel,
  },
  [DireccionModel.metaModel.key]: {
    metaModel: DireccionModel.metaModel,
  },
  [DepartamentoModel.metaModel.key]: {
    metaModel: DepartamentoModel.metaModel,
  },
  [PaisModel.metaModel.key]: {
    metaModel: PaisModel.metaModel,
  },
  [ProvinciaModel.metaModel.key]: {
    metaModel: ProvinciaModel.metaModel,
  },
  [LocalidadModel.metaModel.key]: {
    metaModel: LocalidadModel.metaModel,
  },
  [TipoProfesionModel.metaModel.key]: {
    metaModel: TipoProfesionModel.metaModel,
  },
  [TipoRepresentanteModel.metaModel.key]: {
    metaModel: TipoRepresentanteModel.metaModel,
  },
  [TipoInspectorModel.metaModel.key]: {
    metaModel: TipoInspectorModel.metaModel,
  },
  [TipoContratacionObraModel.metaModel.key]: {
    metaModel: TipoContratacionObraModel.metaModel,
  },
  [TipoFinanciamientoObraModel.metaModel.key]: {
    metaModel: TipoFinanciamientoObraModel.metaModel,
  },
  [TipoParalizacionModel.metaModel.key]: {
    metaModel: TipoParalizacionModel.metaModel,
  },
  [TipoProgramaObraModel.metaModel.key]: {
    metaModel: TipoProgramaObraModel.metaModel,
  },
  [TipoTematicaObraModel.metaModel.key]: {
    metaModel: TipoTematicaObraModel.metaModel,
  },
  [TipoEstadoObraModel.metaModel.key]: {
    metaModel: TipoEstadoObraModel.metaModel,
  },
  [TipoRescisionModel.metaModel.key]: {
    metaModel: TipoRescisionModel.metaModel,
  },
  [TipoRedeterminacionModel.metaModel.key]: {
    metaModel: TipoRedeterminacionModel.metaModel,
  },
  [TipoRecepcionModel.metaModel.key]: {
    metaModel: TipoRecepcionModel.metaModel,
  },
  [TipoModificacionModel.metaModel.key]: {
    metaModel: TipoModificacionModel.metaModel,
  },
  [InspectorModel.metaModel.key]: {
    metaModel: InspectorModel.metaModel,
  },
  [RepresentanteModel.metaModel.key]: {
    metaModel: RepresentanteModel.metaModel,
  },
  [EmpresaModel.metaModel.key]: {
    metaModel: EmpresaModel.metaModel,
  },
  [RepresentanteEmpresaModel.metaModel.key]: {
    metaModel: RepresentanteEmpresaModel.metaModel,
  },
  [ObraModel.metaModel.key]: {
    metaModel: ObraModel.metaModel,
    title: 'Obra Básica',
  },
  [RepresentanteObraModel.metaModel.key]: {
    metaModel: RepresentanteObraModel.metaModel,
  },
  [InspectorObraModel.metaModel.key]: {
    metaModel: InspectorObraModel.metaModel,
  },
  [FojaMedicionModel.metaModel.key]: {
    metaModel: FojaMedicionModel.metaModel,
  },
  [PagoCertificacionModel.metaModel.key]: {
    metaModel: PagoCertificacionModel.metaModel,
  },
  [RedeterminacionModel.metaModel.key]: {
    metaModel: RedeterminacionModel.metaModel,
  },
  [AmpliacionModel.metaModel.key]: {
    metaModel: AmpliacionModel.metaModel,
  },
  [ModificacionModel.metaModel.key]: {
    metaModel: ModificacionModel.metaModel,
  },
  [ParalizacionModel.metaModel.key]: {
    metaModel: ParalizacionModel.metaModel,
  },
  [RescisionModel.metaModel.key]: {
    metaModel: RescisionModel.metaModel,
  },
  [RecepcionModel.metaModel.key]: {
    metaModel: RecepcionModel.metaModel,
  },
  obraGeneral: {
    title: 'Obra Básica General',
  },
  obraTotales: {
    title: 'Totales de Obra',
  },
  obraDetalle: {
    title: 'Detalle de Obra Básica',
  },
}

export const VIEWS_INFO: Record<string, { title: string; faIcon: string }> = {}

Object.entries(VIEWS_BASE).forEach(([key, { metaModel, title, faIcon }]) => {
  VIEWS_INFO[key] = {
    title: title! ?? metaModel!.title.plural,
    faIcon: faIcon! ?? metaModel?.faIcon ?? 'fa-solid fa-cube',
  }
})
