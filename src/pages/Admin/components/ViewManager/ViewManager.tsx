import './ViewManager.css'
import { FavoriteViews } from '..'
import Ampliacion from '../../views/Ampliacion/Ampliacion'
import Empresa from '../../views/Empresa/Empresa'
import FojaMedicion from '../../views/FojaMedicion/FojaMedicion'
import Inspector from '../../views/Inspector/Inspector'
import InspectorObra from '../../views/InspectorObra/InspectorObra'
import Localidad from '../../views/Localidad/Localidad'
import Modificacion from '../../views/Modificacion/Modificacion'
import Obra from '../../views/Obra/Obra'
import ObraDetalle from '../../views/ObraDetalle/ObraDetalle'
import ObraGeneral from '../../views/ObraGeneral/ObraGeneral'
import ObraTotales from '../../views/ObraTotales/ObraTotales'
import PagoCertificacion from '../../views/PagoCertificacion/PagoCertificacion'
import Pais from '../../views/Pais/Pais'
import Paralizacion from '../../views/Paralizacion/Paralizacion'
import Provincia from '../../views/Provincia/Provincia'
import Recepcion from '../../views/Recepcion/Recepcion'
import Redeterminacion from '../../views/Redeterminacion/Redeterminacion'
import Representante from '../../views/Representante/Representante'
import RepresentanteEmpresa from '../../views/RepresentanteEmpresa/RepresentanteEmpresa'
import RepresentanteObra from '../../views/RepresentanteObra/RepresentanteObra'
import Rescision from '../../views/Rescision/Rescision'
import TipoContratacionObra from '../../views/TipoContratacionObra/TipoContratacionObra'
import TipoEstadoObra from '../../views/TipoEstadoObra/TipoEstadoObra'
import TipoFinanciamientoObra from '../../views/TipoFinanciamientoObra/TipoFinanciamientoObra'
import TipoInspector from '../../views/TipoInspector/TipoInspector'
import TipoModificacion from '../../views/TipoModificacion/TipoModificacion'
import TipoParalizacion from '../../views/TipoParalizacion/TipoParalizacion'
import TipoProfesion from '../../views/TipoProfesion/TipoProfesion'
import TipoProgramaObra from '../../views/TipoProgramaObra/TipoProgramaObra'
import TipoRecepcion from '../../views/TipoRecepcion/TipoRecepcion'
import TipoRedeterminacion from '../../views/TipoRedeterminacion/TipoRedeterminacion'
import TipoRepresentante from '../../views/TipoRepresentante/TipoRepresentante'
import TipoRescision from '../../views/TipoRescision/TipoRescision'
import TipoTematicaObra from '../../views/TipoTematicaObra/TipoTematicaObra'
import Area from '../../views/Area/Area'
import TipoNivelArea from '../../views/TipoNivelArea/TipoNivelArea'
import TipoEnteObra from '../../views/TipoEnteObra/TipoEnteObra'
import TipoOrigenFinanciamientoObra from '../../views/TipoOrigenFinanciamientoObra/TipoOrigenFinanciamientoObra'
import GM from '../../views/G/GM'
import APG from '../../views/APG/APG'
import Departamento from '../../views/Departamento/Departamento'

const ViewManager = () => (
  <div className="cmp-view-manager">
    <div className="default">
      <FavoriteViews />
    </div>
    <Area />
    <Pais />
    <Provincia />
    <APG />
    <Departamento />
    <Localidad />
    <TipoNivelArea />
    <TipoProfesion />
    <TipoInspector />
    <TipoRepresentante />
    <TipoEnteObra />
    <TipoContratacionObra />
    <TipoOrigenFinanciamientoObra />
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
    <GM />
  </div>
)

export default ViewManager
