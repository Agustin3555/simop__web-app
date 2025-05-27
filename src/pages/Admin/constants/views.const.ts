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
  [SubSecretariaMeta.key]: {
    metaModel: SubSecretariaMeta,
  },
  [DireccionMeta.key]: {
    metaModel: DireccionMeta,
  },
  [DepartamentoMeta.key]: {
    metaModel: DepartamentoMeta,
  },
  [PaisMeta.key]: {
    metaModel: PaisMeta,
  },
  [ProvinciaMeta.key]: {
    metaModel: ProvinciaMeta,
  },
  [LocalidadMeta.key]: {
    metaModel: LocalidadMeta,
  },
  [TipoProfesionMeta.key]: {
    metaModel: TipoProfesionMeta,
  },
  [TipoRepresentanteMeta.key]: {
    metaModel: TipoRepresentanteMeta,
  },
  [TipoInspectorMeta.key]: {
    metaModel: TipoInspectorMeta,
  },
  [TipoContratacionObraMeta.key]: {
    metaModel: TipoContratacionObraMeta,
  },
  [TipoFinanciamientoObraMeta.key]: {
    metaModel: TipoFinanciamientoObraMeta,
  },
  [TipoParalizacionMeta.key]: {
    metaModel: TipoParalizacionMeta,
  },
  [TipoProgramaObraMeta.key]: {
    metaModel: TipoProgramaObraMeta,
  },
  [TipoTematicaObraMeta.key]: {
    metaModel: TipoTematicaObraMeta,
  },
  [TipoEstadoObraMeta.key]: {
    metaModel: TipoEstadoObraMeta,
  },
  [TipoRescisionMeta.key]: {
    metaModel: TipoRescisionMeta,
  },
  [TipoRedeterminacionMeta.key]: {
    metaModel: TipoRedeterminacionMeta,
  },
  [TipoRecepcionMeta.key]: {
    metaModel: TipoRecepcionMeta,
  },
  [TipoModificacionMeta.key]: {
    metaModel: TipoModificacionMeta,
  },
  [InspectorMeta.key]: {
    metaModel: InspectorMeta,
  },
  [RepresentanteMeta.key]: {
    metaModel: RepresentanteMeta,
  },
  [EmpresaMeta.key]: {
    metaModel: EmpresaMeta,
  },
  [RepresentanteEmpresaMeta.key]: {
    metaModel: RepresentanteEmpresaMeta,
  },
  [ObraMeta.key]: {
    metaModel: ObraMeta,
    title: 'Obra Básica',
  },
  [RepresentanteObraMeta.key]: {
    metaModel: RepresentanteObraMeta,
  },
  [InspectorObraMeta.key]: {
    metaModel: InspectorObraMeta,
  },
  [FojaMedicionMeta.key]: {
    metaModel: FojaMedicionMeta,
  },
  [PagoCertificacionMeta.key]: {
    metaModel: PagoCertificacionMeta,
  },
  [RedeterminacionMeta.key]: {
    metaModel: RedeterminacionMeta,
  },
  [AmpliacionMeta.key]: {
    metaModel: AmpliacionMeta,
  },
  [ModificacionMeta.key]: {
    metaModel: ModificacionMeta,
  },
  [ParalizacionMeta.key]: {
    metaModel: ParalizacionMeta,
  },
  [RescisionMeta.key]: {
    metaModel: RescisionMeta,
  },
  [RecepcionMeta.key]: {
    metaModel: RecepcionMeta,
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
