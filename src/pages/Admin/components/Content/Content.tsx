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
  RepresentanteObra,
  TipoContratacionObra,
  TipoFinanciamientoObra,
  TipoProgramaObra,
  TipoTematicaObra,
  TipoEstadoObra,

  // ModificacionObra,
  // ParalizacionObra,
  // Tramite,

  // Obra,
  // FojaMedicion,
  // Certificacion,
  // PagoCertificacion,
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
    <RepresentanteObra />
    <TipoContratacionObra />
    <TipoFinanciamientoObra />
    <TipoProgramaObra />
    <TipoTematicaObra />
    <TipoEstadoObra />

    {/* <ModificacionObra /> */}
    {/* <ParalizacionObra /> */}
    {/* <Tramite /> */}

    {/* <Obra /> */}
    {/* <FojaMedicion /> */}
    {/* <Certificacion /> */}
    {/* <PagoCertificacion /> */}
  </div>
)

export default Content
