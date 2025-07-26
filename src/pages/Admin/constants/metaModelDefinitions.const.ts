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
import { MetaModelDefinition } from '../meta/metaModel'
import { MetaModelKey } from './metaModelKey.const'

export const META_MODEL_DEFINITIONS: Record<MetaModelKey, MetaModelDefinition> =
  {
    ampliacion: AmpliacionMeta,
    apg: APGMeta,
    area: AreaMeta,
    departamento: DepartamentoMeta,
    empresa: EmpresaMeta,
    fojaMedicion: FojaMedicionMeta,
    inspector: InspectorMeta,
    inspectorObra: InspectorObraMeta,
    localidad: LocalidadMeta,
    modificacion: ModificacionMeta,
    obra: ObraMeta,
    pagoCertificacion: PagoCertificacionMeta,
    pais: PaisMeta,
    paralizacion: ParalizacionMeta,
    provincia: ProvinciaMeta,
    recepcion: RecepcionMeta,
    redeterminacion: RedeterminacionMeta,
    representante: RepresentanteMeta,
    representanteEmpresa: RepresentanteEmpresaMeta,
    representanteObra: RepresentanteObraMeta,
    rescision: RescisionMeta,
    tipoContratacionObra: TipoContratacionObraMeta,
    tipoEnteObra: TipoEnteObraMeta,
    tipoEstadoObra: TipoEstadoObraMeta,
    tipoFinanciamientoObra: TipoFinanciamientoObraMeta,
    tipoInspector: TipoInspectorMeta,
    tipoModificacion: TipoModificacionMeta,
    tipoNivelArea: TipoNivelAreaMeta,
    tipoOrigenFinanciamientoObra: TipoOrigenFinanciamientoObraMeta,
    tipoParalizacion: TipoParalizacionMeta,
    tipoProfesion: TipoProfesionMeta,
    tipoProgramaObra: TipoProgramaObraMeta,
    tipoRecepcion: TipoRecepcionMeta,
    tipoRedeterminacion: TipoRedeterminacionMeta,
    tipoRepresentante: TipoRepresentanteMeta,
    tipoRescision: TipoRescisionMeta,
    tipoTematicaObra: TipoTematicaObraMeta,
  }
