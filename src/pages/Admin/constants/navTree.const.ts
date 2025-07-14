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

export interface SectionNode {
  viewKey?: string
  title?: string
  sections?: SectionNode[]
}

export const TREE: SectionNode[] = [
  {
    title: 'Tablero de Gestión',
    sections: [
      { viewKey: 'obraGeneral' },
      { viewKey: 'obraTotales' },
      { viewKey: 'obraDetalle' },
      { viewKey: 'gm' },
    ],
  },
  {
    title: 'Sobre Obras',
    sections: [
      { viewKey: ObraMeta.key },
      {
        title: 'Eventos',
        sections: [
          { viewKey: FojaMedicionMeta.key },
          { viewKey: PagoCertificacionMeta.key },
          { viewKey: RedeterminacionMeta.key },
          { viewKey: AmpliacionMeta.key },
          { viewKey: ModificacionMeta.key },
          { viewKey: ParalizacionMeta.key },
          { viewKey: RescisionMeta.key },
          { viewKey: RecepcionMeta.key },
        ],
      },
      {
        title: 'Actores',
        sections: [
          { viewKey: RepresentanteObraMeta.key },
          { viewKey: InspectorObraMeta.key },
        ],
      },
    ],
  },
  {
    title: 'Sobre Empresas',
    sections: [
      { viewKey: EmpresaMeta.key },
      {
        title: 'Actores',
        sections: [{ viewKey: RepresentanteEmpresaMeta.key }],
      },
    ],
  },
  {
    title: 'Ubicación',
    sections: [
      { viewKey: PaisMeta.key },
      { viewKey: ProvinciaMeta.key },
      { viewKey: APGMeta.key },
      { viewKey: DepartamentoMeta.key },
      { viewKey: LocalidadMeta.key },
    ],
  },
  {
    title: 'Actores',
    sections: [
      { viewKey: InspectorMeta.key },
      { viewKey: RepresentanteMeta.key },
    ],
  },
  {
    title: 'Tipos',
    sections: [
      { viewKey: TipoNivelAreaMeta.key },
      { viewKey: TipoProfesionMeta.key },
      { viewKey: TipoRepresentanteMeta.key },
      { viewKey: TipoInspectorMeta.key },

      { viewKey: TipoEnteObraMeta.key },
      { viewKey: TipoContratacionObraMeta.key },
      { viewKey: TipoOrigenFinanciamientoObraMeta.key },
      { viewKey: TipoFinanciamientoObraMeta.key },
      { viewKey: TipoProgramaObraMeta.key },
      { viewKey: TipoTematicaObraMeta.key },
      { viewKey: TipoEstadoObraMeta.key },

      { viewKey: TipoParalizacionMeta.key },
      { viewKey: TipoRescisionMeta.key },
      { viewKey: TipoRedeterminacionMeta.key },
      { viewKey: TipoRecepcionMeta.key },
      { viewKey: TipoModificacionMeta.key },
    ],
  },
  { viewKey: AreaMeta.key },
]
