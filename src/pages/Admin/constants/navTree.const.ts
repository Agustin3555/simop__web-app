import { AmpliacionMeta } from '../modules/ampliacion/ampliacion.meta'
import { DepartamentoMeta } from '../modules/departamento/departamento.meta'
import { DireccionMeta } from '../modules/direccion/direccion.meta'
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
import { SubsecretariaMeta } from '../modules/subsecretaria/subsecretaria.meta'
import { TipoContratacionObraMeta } from '../modules/tipoContratacionObra/tipoContratacionObra.meta'
import { TipoEstadoObraMeta } from '../modules/tipoEstadoObra/tipoEstadoObra.meta'
import { TipoFinanciamientoObraMeta } from '../modules/tipoFinanciamientoObra/tipoFinanciamientoObra.meta'
import { TipoInspectorMeta } from '../modules/tipoInspector/tipoInspector.meta'
import { TipoModificacionMeta } from '../modules/tipoModificacion/tipoModificacion.meta'
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
    title: 'Administración',
    sections: [
      {
        title: 'Organigrama',
        sections: [
          { viewKey: SubsecretariaMeta.key },
          { viewKey: DireccionMeta.key },
          { viewKey: DepartamentoMeta.key },
        ],
      },
      {
        title: 'Ubicación Geográfica',
        sections: [
          { viewKey: PaisMeta.key },
          { viewKey: ProvinciaMeta.key },
          { viewKey: LocalidadMeta.key },
        ],
      },
      {
        title: 'Tipos',
        sections: [
          { viewKey: TipoProfesionMeta.key },
          { viewKey: TipoRepresentanteMeta.key },
          { viewKey: TipoInspectorMeta.key },
          {
            title: 'Obras',
            sections: [
              { viewKey: TipoContratacionObraMeta.key },
              { viewKey: TipoFinanciamientoObraMeta.key },
              { viewKey: TipoParalizacionMeta.key },
              { viewKey: TipoProgramaObraMeta.key },
              { viewKey: TipoTematicaObraMeta.key },
              { viewKey: TipoEstadoObraMeta.key },
              { viewKey: TipoRescisionMeta.key },
              { viewKey: TipoRedeterminacionMeta.key },
              { viewKey: TipoRecepcionMeta.key },
              { viewKey: TipoModificacionMeta.key },
            ],
          },
        ],
      },
      { viewKey: InspectorMeta.key },
      { viewKey: RepresentanteMeta.key },
    ],
  },
  {
    title: 'Empresas',
    sections: [
      { viewKey: EmpresaMeta.key },
      { viewKey: RepresentanteEmpresaMeta.key },
    ],
  },
  {
    title: 'Obras',
    sections: [
      { viewKey: ObraMeta.key },
      { viewKey: RepresentanteObraMeta.key },
      { viewKey: InspectorObraMeta.key },
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
    title: 'Tablero de Gestión',
    sections: [
      { viewKey: 'obraGeneral' },
      { viewKey: 'obraTotales' },
      { viewKey: 'obraDetalle' },
    ],
  },
]
