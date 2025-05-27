import { AmpliacionMeta } from '../modules/ampliacion'
import { DepartamentoMeta } from '../modules/departamento'
import { DireccionMeta } from '../modules/direccion'
import { EmpresaMeta } from '../modules/empresa'
import { FojaMedicionMeta } from '../modules/fojaMedicion'
import { InspectorMeta } from '../modules/inspector'
import { InspectorObraMeta } from '../modules/inspectorObra'
import { LocalidadMeta } from '../modules/localidad'
import { ModificacionMeta } from '../modules/modificacion'
import { ObraMeta } from '../modules/obra'
import { PagoCertificacionMeta } from '../modules/pagoCertificacion'
import { PaisMeta } from '../modules/pais'
import { ParalizacionMeta } from '../modules/paralizacion'
import { ProvinciaMeta } from '../modules/provincia'
import { RecepcionMeta } from '../modules/recepcion'
import { RedeterminacionMeta } from '../modules/redeterminacion'
import { RepresentanteMeta } from '../modules/representante'
import { RepresentanteEmpresaMeta } from '../modules/representanteEmpresa'
import { RepresentanteObraMeta } from '../modules/representanteObra'
import { RescisionMeta } from '../modules/rescision'
import { SubsecretariaMeta } from '../modules/subsecretaria'
import { TipoContratacionObraMeta } from '../modules/tipoContratacionObra'
import { TipoEstadoObraMeta } from '../modules/tipoEstadoObra'
import { TipoFinanciamientoObraMeta } from '../modules/tipoFinanciamientoObra'
import { TipoInspectorMeta } from '../modules/tipoInspector'
import { TipoModificacionMeta } from '../modules/tipoModificacion'
import { TipoParalizacionMeta } from '../modules/tipoParalizacion'
import { TipoProfesionMeta } from '../modules/tipoProfesion'
import { TipoProgramaObraMeta } from '../modules/tipoProgramaObra'
import { TipoRecepcionMeta } from '../modules/tipoRecepcion'
import { TipoRedeterminacionMeta } from '../modules/tipoRedeterminacion'
import { TipoRepresentanteMeta } from '../modules/tipoRepresentante'
import { TipoRescisionMeta } from '../modules/tipoRescision'
import { TipoTematicaObraMeta } from '../modules/tipoTematicaObra'
import { MetaModel } from '../services/config'

const VIEWS_BASE: Record<
  string,
  { metaModel?: MetaModel; title?: string; faIcon?: string }
> = {
  [SubsecretariaMeta.key]: {
    metaModel: SubsecretariaMeta,
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
