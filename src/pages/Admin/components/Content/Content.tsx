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
    <TipoInspector />
    <TipoRepresentante />
    <TipoContratacionObra />
    <TipoFinanciamientoObra />
    <TipoProgramaObra />
    <TipoTematicaObra />
    <TipoEstadoObra />
    <TipoRedeterminacion />
    <TipoModificacion />
    <TipoParalizacion />
    <TipoRescision />
    <TipoRecepcion />
    <Inspector />
    <Representante />
    <Empresa />
    <RepresentanteEmpresa />
    <Obra />
    <RepresentanteObra />
    <InspectorObra />
    <FojaMedicion />
    <Certificacion />
    <PagoCertificacion />
    <Redeterminacion />
    <Ampliacion />
    <Modificacion />
    <Paralizacion />
    <Rescision />
    <Recepcion />
  </div>
)

export default Content
