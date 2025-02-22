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
  TipoParalizacion,
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
  Paralizacion,
  Recepcion,
  Rescision,
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
    <TipoParalizacion />
    <TipoTematicaObra />
    <TipoEstadoObra />
    <TipoRescision />
    <TipoRedeterminacion />
    <TipoRecepcion />
    <TipoModificacion />
    <Redeterminacion />
    <Ampliacion />
    <Modificacion />
    <Paralizacion />
    <Rescision />
    <Recepcion />

    {/* <ModificacionObra /> */}
    {/* <ParalizacionObra /> */}
    {/* <Tramite /> */}

    <FojaMedicion />
    <Certificacion />
    <PagoCertificacion />
  </div>
)

export default Content
