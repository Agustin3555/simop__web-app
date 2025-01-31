import './Content.css'
import {
  SubSecretaria,
  Direccion,
  Departamento,
  Pais,
  Provincia,
  Localidad,
  TipoProfesion,
  Inspector,
  TipoInspector,
  Representante,
  TipoRepresentante,
  Empresa,
  RepresentanteEmpresa,
  Obra,
  RepresentanteObra,
  InspectorObra,
  TipoContratacionObra,
  TipoFinanciamientoObra,
  TipoProgramaObra,
  TipoTematicaObra,
  TipoEstadoObra,
  TipoRescision,
  TipoRedeterminacion,
  TipoRecepcion,
  TipoModificacion,
  FojaMedicion,
  Redeterminacion,
  Ampliacion,
  Modificacion,
  // ModificacionObra,
  // ParalizacionObra,
  // Tramite,
  Certificacion,
  PagoCertificacion,
} from '../../views'
const Content = () => (
  <div className="cmp-content">
    <SubSecretaria />
    <Direccion />
    <Departamento />
    <Pais />
    <Provincia />
    <Localidad />
    <TipoProfesion />
    <Inspector />
    <TipoInspector />
    <Representante />
    <TipoRepresentante />
    <Empresa />
    <RepresentanteEmpresa />
    <Obra />
    <RepresentanteObra />
    <InspectorObra />
    <TipoContratacionObra />
    <TipoFinanciamientoObra />
    <TipoProgramaObra />
    <TipoTematicaObra />
    <TipoEstadoObra />
    <TipoRescision />
    <TipoRedeterminacion />
    <TipoRecepcion />
    <TipoModificacion />
    <Redeterminacion />
    <Ampliacion />
    <Modificacion />

    {/* <ModificacionObra /> */}
    {/* <ParalizacionObra /> */}
    {/* <Tramite /> */}

    <FojaMedicion />
    <Certificacion />
    <PagoCertificacion />
  </div>
)

export default Content
