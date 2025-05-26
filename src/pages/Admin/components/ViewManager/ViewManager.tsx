import './ViewManager.css'
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
  PagoCertificacion,
  ObraGeneral,
  ObraTotales,
  ObraDetalle,
} from '../../views'

const ViewManager = () => (
  <div className="cmp-view-manager">
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
    <PagoCertificacion />
    <Redeterminacion />
    <Ampliacion />
    <Modificacion />
    <Paralizacion />
    <Rescision />
    <Recepcion />
    <ObraGeneral />
    <ObraTotales />
    <ObraDetalle />
  </div>
)

export default ViewManager
