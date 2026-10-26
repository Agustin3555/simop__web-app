import { PaisTable } from '@/modules/pais/pais.table'
// import { AmpliacionMeta } from '../modules/ampliacion/ampliacion.meta'
// import { APGMeta } from '../modules/apg/apg.meta'
// import { AreaMeta } from '../modules/area/area.meta'
// import { DepartamentoMeta } from '../modules/departamento/departamento.meta'
// import { EmpresaMeta } from '../modules/empresa/empresa.meta'
// import { FojaMedicionMeta } from '../modules/fojaMedicion/fojaMedicion.meta'
// import { InspectorMeta } from '../modules/inspector/inspector.meta'
// import { InspectorObraMeta } from '../modules/inspectorObra/inspectorObra.meta'
// import { LocalidadMeta } from '../modules/localidad/localidad.meta'
// import { ModificacionMeta } from '../modules/modificacion/modificacion.meta'
// import { ObraMeta } from '../modules/obra/obra.meta'
// import { PagoCertificacionMeta } from '../modules/pagoCertificacion/pagoCertificacion.meta'
// import { ParalizacionMeta } from '../modules/paralizacion/paralizacion.meta'
// import { RecepcionMeta } from '../modules/recepcion/recepcion.meta'
// import { RedeterminacionMeta } from '../modules/redeterminacion/redeterminacion.meta'
// import { RepresentanteMeta } from '../modules/representante/representante.meta'
// import { RepresentanteEmpresaMeta } from '../modules/representanteEmpresa/representanteEmpresa.meta'
// import { RepresentanteObraMeta } from '../modules/representanteObra/representanteObra.meta'
// import { RescisionMeta } from '../modules/rescision/rescision.meta'
import { TableKey } from './metaModelKey.const'
import { ProvinciaTable } from '@/modules/provincia/provincia.table'
import { ColumnDef, TableDef } from '@/shared/core/types'
import { TipoTematicaObraTable } from '@/modules/tipoTematicaObra/tipoTematicaObra.meta'
import { TipoContratacionObraTable } from '@/modules/tipoContratacionObra/tipoContratacionObra.meta'
import { TipoEnteObraTable } from '@/modules/tipoEnteObra/tipoEnteObra.meta'
import { TipoEstadoObraTable } from '@/modules/tipoEstadoObra/tipoEstadoObra.meta'
import { TipoFinanciamientoObraTable } from '@/modules/tipoFinanciamientoObra/tipoFinanciamientoObra.meta'
import { TipoInspectorTable } from '@/modules/tipoInspector/tipoInspector.meta'
import { TipoModificacionTable } from '@/modules/tipoModificacion/tipoModificacion.meta'
import { TipoNivelAreaTable } from '@/modules/tipoNivelArea/tipoNivelArea.meta'
import { TipoOrigenFinanciamientoObraTable } from '@/modules/tipoOrigenFinanciamientoObra/tipoOrigenFinanciamientoObra.meta'
import { TipoParalizacionTable } from '@/modules/tipoParalizacion/tipoParalizacion.meta'
import { TipoProfesionTable } from '@/modules/tipoProfesion/tipoProfesion.meta'
import { TipoProgramaObraTable } from '@/modules/tipoProgramaObra/tipoProgramaObra.meta'
import { TipoRecepcionTable } from '@/modules/tipoRecepcion/tipoRecepcion.meta'
import { TipoRedeterminacionTable } from '@/modules/tipoRedeterminacion/tipoRedeterminacion.meta'
import { TipoRepresentanteTable } from '@/modules/tipoRepresentante/tipoRepresentante.meta'
import { TipoRescisionTable } from '@/modules/tipoRescision/tipoRescision.meta'

export const TABLE_DEFS = {
  // ampliacion: AmpliacionMeta,
  // apg: APGMeta,
  // area: AreaMeta,
  // departamento: DepartamentoMeta,
  // empresa: EmpresaMeta,
  // fojaMedicion: FojaMedicionMeta,
  // inspector: InspectorMeta,
  // inspectorObra: InspectorObraMeta,
  // localidad: LocalidadMeta,
  // modificacion: ModificacionMeta,
  // obra: ObraMeta,
  // pagoCertificacion: PagoCertificacionMeta,
  pais: PaisTable,
  // paralizacion: ParalizacionMeta,
  provincia: ProvinciaTable,
  // recepcion: RecepcionMeta,
  // redeterminacion: RedeterminacionMeta,
  // representante: RepresentanteMeta,
  // representanteEmpresa: RepresentanteEmpresaMeta,
  // representanteObra: RepresentanteObraMeta,
  // rescision: RescisionMeta,
  tipoContratacionObra: TipoContratacionObraTable,
  tipoEnteObra: TipoEnteObraTable,
  tipoEstadoObra: TipoEstadoObraTable,
  tipoFinanciamientoObra: TipoFinanciamientoObraTable,
  tipoInspector: TipoInspectorTable,
  tipoModificacion: TipoModificacionTable,
  tipoNivelArea: TipoNivelAreaTable,
  tipoOrigenFinanciamientoObra: TipoOrigenFinanciamientoObraTable,
  tipoParalizacion: TipoParalizacionTable,
  tipoProfesion: TipoProfesionTable,
  tipoProgramaObra: TipoProgramaObraTable,
  tipoRecepcion: TipoRecepcionTable,
  tipoRedeterminacion: TipoRedeterminacionTable,
  tipoRepresentante: TipoRepresentanteTable,
  tipoRescision: TipoRescisionTable,
  tipoTematicaObra: TipoTematicaObraTable,
} satisfies Record<TableKey, TableDef<readonly ColumnDef[]>>

// TODO: constantes a revivir
