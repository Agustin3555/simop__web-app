import { MetaModel } from '../meta'
import { AmpliacionMeta } from '../modules/ampliacion/ampliacion.meta'
import { APGMeta } from '../modules/apg/apg.meta'
import { AreaMeta } from '../modules/area/area.meta'
import { DepartamentoMeta } from '../modules/departamento/departamento.meta'
import { EmpresaMeta } from '../modules/empresa/empresa.meta'
import { FojaMedicionMeta } from '../modules/fojaMedicion/fojaMedicion.meta'
import { InspectorMeta } from '../modules/inspector/inspector.meta'
import { InspectorObraMeta } from '../modules/inspectorObra/inspectorObra.meta'
import { LocalidadMeta } from '../modules/localidad/localidad.meta'
import { ModificacionMeta } from '../modules/modificacion/modificacion.meta'
import { ObraMeta } from '../modules/obra/obra.meta'
import { PagoCertificacionMeta } from '../modules/pagoCertificacion/pagoCertificacion.meta'
import { PaisMeta } from '../modules/pais/pais.meta'
import { ParalizacionMeta } from '../modules/paralizacion/paralizacion.meta'
import { ProvinciaMeta } from '../modules/provincia/provincia.meta'
import { RecepcionMeta } from '../modules/recepcion/recepcion.meta'
import { RedeterminacionMeta } from '../modules/redeterminacion/redeterminacion.meta'
import { RepresentanteMeta } from '../modules/representante/representante.meta'
import { RepresentanteEmpresaMeta } from '../modules/representanteEmpresa/representanteEmpresa.meta'
import { RepresentanteObraMeta } from '../modules/representanteObra/representanteObra.meta'
import { RescisionMeta } from '../modules/rescision/rescision.meta'
import { TipoContratacionObraMeta } from '../modules/tipoContratacionObra/tipoContratacionObra.meta'
import { TipoEnteObraMeta } from '../modules/tipoEnteObra/tipoEnteObra.meta'
import { TipoEstadoObraMeta } from '../modules/tipoEstadoObra/tipoEstadoObra.meta'
import { TipoFinanciamientoObraMeta } from '../modules/tipoFinanciamientoObra/tipoFinanciamientoObra.meta'
import { TipoInspectorMeta } from '../modules/tipoInspector/tipoInspector.meta'
import { TipoModificacionMeta } from '../modules/tipoModificacion/tipoModificacion.meta'
import { TipoNivelAreaMeta } from '../modules/tipoNivelArea/tipoNivelArea.meta'
import { TipoOrigenFinanciamientoObraMeta } from '../modules/tipoOrigenFinanciamientoObra/tipoOrigenFinanciamientoObra.meta'
import { TipoParalizacionMeta } from '../modules/tipoParalizacion/tipoParalizacion.meta'
import { TipoProfesionMeta } from '../modules/tipoProfesion/tipoProfesion.meta'
import { TipoProgramaObraMeta } from '../modules/tipoProgramaObra/tipoProgramaObra.meta'
import { TipoRecepcionMeta } from '../modules/tipoRecepcion/tipoRecepcion.meta'
import { TipoRedeterminacionMeta } from '../modules/tipoRedeterminacion/tipoRedeterminacion.meta'
import { TipoRepresentanteMeta } from '../modules/tipoRepresentante/tipoRepresentante.meta'
import { TipoRescisionMeta } from '../modules/tipoRescision/tipoRescision.meta'
import { TipoTematicaObraMeta } from '../modules/tipoTematicaObra/tipoTematicaObra.meta'

const VIEWS_BASE: Record<
  string,
  {
    metaModel?: MetaModel
    title?: string
    faIcon?: string
  }
> = {
  [AreaMeta.key]: {
    metaModel: AreaMeta,
  },
  [PaisMeta.key]: {
    metaModel: PaisMeta,
  },
  [ProvinciaMeta.key]: {
    metaModel: ProvinciaMeta,
  },
  [APGMeta.key]: {
    metaModel: APGMeta,
  },
  [DepartamentoMeta.key]: {
    metaModel: DepartamentoMeta,
  },
  [LocalidadMeta.key]: {
    metaModel: LocalidadMeta,
  },
  [TipoNivelAreaMeta.key]: {
    metaModel: TipoNivelAreaMeta,
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
  [TipoEnteObraMeta.key]: {
    metaModel: TipoEnteObraMeta,
  },
  [TipoContratacionObraMeta.key]: {
    metaModel: TipoContratacionObraMeta,
  },
  [TipoOrigenFinanciamientoObraMeta.key]: {
    metaModel: TipoOrigenFinanciamientoObraMeta,
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
  gm: {
    title: 'Planificación Geográfica',
    faIcon: 'fa-solid fa-map-location-dot',
  },
}

export const VIEWS_INFO: Record<string, { title: string; faIcon: string }> = {}

Object.entries(VIEWS_BASE).forEach(([key, { metaModel, title, faIcon }]) => {
  VIEWS_INFO[key] = {
    title: title! ?? metaModel!.title.plural,
    faIcon: faIcon! ?? metaModel?.faIcon ?? 'fa-solid fa-cube',
  }
})
