import './Content.css'
import {
  SubSecretarias,
  Direcciones,
  Departamentos,
  Pais,
  Provincia,
  Localidad,
  EstadoObra,
  Financiamiento,
  ModificacionObra,
  ParalizacionObra,
  ProgramaObra,
  TipoTematicaObra,
  RepresentanteEmpresa,
  Tramite,
  TipoProfesion,
  TipoInspector,
  Inspector,
  TipoRepresentanteEmpresa,
  Empresa,
  Obra,
  TipoContratacionObra,
} from '../../views'

const Content = () => (
  <div className="cmp-content">
    <SubSecretarias />
    <Direcciones />
    <Departamentos />
    <Pais />
    <Provincia />
    <Localidad />
    <TipoContratacionObra />
    <EstadoObra />
    <Financiamiento />
    <ModificacionObra />
    <ParalizacionObra />
    <ProgramaObra />
    <TipoTematicaObra />
    <RepresentanteEmpresa />
    <Tramite />
    <TipoProfesion />
    <TipoInspector />
    <TipoRepresentanteEmpresa />
    <Inspector />
    <Empresa />
    <Obra />
  </div>
)

export default Content
