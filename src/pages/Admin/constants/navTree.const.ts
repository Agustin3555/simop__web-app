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
