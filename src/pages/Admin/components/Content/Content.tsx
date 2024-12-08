import './Content.css'
import { Departamentos, Direcciones, Pais, Provincia, SubSecretarias,Localidad, EstadoObra, Financiamiento, ParalizacionObra, ProgramaObra,RepresentanteEmpresa, Tramite, Inspector, ModificacionObra, TipoInspector } from '../../views'



const Content = () => (
  <div className="cmp-content">
    <SubSecretarias />
    <Direcciones />
    <Departamentos />
    <Pais/>
    <Provincia/>
    <Localidad/>
    <EstadoObra/>
    <Financiamiento/>
    <ModificacionObra/>
    <ParalizacionObra/>
    <ProgramaObra/>
    <RepresentanteEmpresa/>
    <Tramite/>
    <TipoInspector/>
    <Inspector/>

    
  </div>
)

export default Content
