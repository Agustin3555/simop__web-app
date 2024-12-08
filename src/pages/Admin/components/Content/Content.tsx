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
  RepresentanteEmpresa,
  Tramite,
  TipoProfesion,
  TipoInspector,
  Inspector,
} from '../../views'

const Content = () => (
  <div className="cmp-content">
    <SubSecretarias />
    <Direcciones />
    <Departamentos />
    <Pais />
    <Provincia />
    <Localidad />
    <EstadoObra />
    <Financiamiento />
    <ModificacionObra />
    <ParalizacionObra />
    <ProgramaObra />
    <RepresentanteEmpresa />
    <Tramite />
    <TipoProfesion />
    <TipoInspector />
    <Inspector />
  </div>
)

export default Content
