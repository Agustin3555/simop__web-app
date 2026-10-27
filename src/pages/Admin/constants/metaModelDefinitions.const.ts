import { PaisTable } from '@/modules/pais/pais.table'
import { TableKey } from './metaModelKey.const'
import { ProvinciaTable } from '@/modules/provincia/provincia.table'
import { ColumnDef, TableDef } from '@/shared/core/types'
import { TipoTematicaObraTable } from '@/modules/tipoTematicaObra/tipoTematicaObra.table'
import { TipoContratacionObraTable } from '@/modules/tipoContratacionObra/tipoContratacionObra.table'
import { TipoEnteObraTable } from '@/modules/tipoEnteObra/tipoEnteObra.table'
import { TipoEstadoObraTable } from '@/modules/tipoEstadoObra/tipoEstadoObra.table'
import { TipoFinanciamientoObraTable } from '@/modules/tipoFinanciamientoObra/tipoFinanciamientoObra.table'
import { TipoInspectorTable } from '@/modules/tipoInspector/tipoInspector.table'
import { TipoModificacionTable } from '@/modules/tipoModificacion/tipoModificacion.table'
import { TipoNivelAreaTable } from '@/modules/tipoNivelArea/tipoNivelArea.table'
import { TipoOrigenFinanciamientoObraTable } from '@/modules/tipoOrigenFinanciamientoObra/tipoOrigenFinanciamientoObra.table'
import { TipoParalizacionTable } from '@/modules/tipoParalizacion/tipoParalizacion.table'
import { TipoProfesionTable } from '@/modules/tipoProfesion/tipoProfesion.table'
import { TipoProgramaObraTable } from '@/modules/tipoProgramaObra/tipoProgramaObra.table'
import { TipoRecepcionTable } from '@/modules/tipoRecepcion/tipoRecepcion.table'
import { TipoRedeterminacionTable } from '@/modules/tipoRedeterminacion/tipoRedeterminacion.table'
import { TipoRepresentanteTable } from '@/modules/tipoRepresentante/tipoRepresentante.table'
import { TipoRescisionTable } from '@/modules/tipoRescision/tipoRescision.table'
import { ObraTable } from '@/modules/obra/obra.table'
import { AmpliacionTable } from '@/modules/ampliacion/ampliacion.table'
import { APGTable } from '@/modules/apg/apg.table'
import { AreaTable } from '@/modules/area/area.table'
import { DepartamentoTable } from '@/modules/departamento/departamento.table'
import { EmpresaTable } from '@/modules/empresa/empresa.table'
import { FojaMedicionTable } from '@/modules/fojaMedicion/fojaMedicion.table'
import { InspectorTable } from '@/modules/inspector/inspector.table'
import { InspectorObraTable } from '@/modules/inspectorObra/inspectorObra.table'
import { LocalidadTable } from '@/modules/localidad/localidad.table'
import { ModificacionTable } from '@/modules/modificacion/modificacion.table'
import { PagoCertificacionTable } from '@/modules/pagoCertificacion/pagoCertificacion.table'
import { ParalizacionTable } from '@/modules/paralizacion/paralizacion.table'
import { RecepcionTable } from '@/modules/recepcion/recepcion.table'
import { RedeterminacionTable } from '@/modules/redeterminacion/redeterminacion.table'
import { RepresentanteTable } from '@/modules/representante/representante.table'
import { RepresentanteEmpresaTable } from '@/modules/representanteEmpresa/representanteEmpresa.table'
import { RepresentanteObraTable } from '@/modules/representanteObra/representanteObra.table'
import { RescisionTable } from '@/modules/rescision/rescision.table'

export const TABLE_DEFS = {
  ampliacion: AmpliacionTable,
  apg: APGTable,
  area: AreaTable,
  departamento: DepartamentoTable,
  empresa: EmpresaTable,
  fojaMedicion: FojaMedicionTable,
  inspector: InspectorTable,
  inspectorObra: InspectorObraTable,
  localidad: LocalidadTable,
  modificacion: ModificacionTable,
  obra: ObraTable,
  pagoCertificacion: PagoCertificacionTable,
  pais: PaisTable,
  paralizacion: ParalizacionTable,
  provincia: ProvinciaTable,
  recepcion: RecepcionTable,
  redeterminacion: RedeterminacionTable,
  representante: RepresentanteTable,
  representanteEmpresa: RepresentanteEmpresaTable,
  representanteObra: RepresentanteObraTable,
  rescision: RescisionTable,
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
