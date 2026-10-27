import './ViewManager.css'
import FavoriteViews from '../FavoriteViews/FavoriteViews'
import { TipoContratacionObra } from '@/modules/tipoContratacionObra/TipoContratacionObra'
import { TipoEnteObra } from '@/modules/tipoEnteObra/TipoEnteObra'
import { TipoEstadoObra } from '@/modules/tipoEstadoObra/TipoEstadoObra'
import { TipoFinanciamientoObra } from '@/modules/tipoFinanciamientoObra/TipoFinanciamientoObra'
import { TipoInspector } from '@/modules/tipoInspector/TipoInspector'
import { TipoModificacion } from '@/modules/tipoModificacion/TipoModificacion'
import { TipoNivelArea } from '@/modules/tipoNivelArea/TipoNivelArea'
import { TipoOrigenFinanciamientoObra } from '@/modules/tipoOrigenFinanciamientoObra/TipoOrigenFinanciamientoObra'
import { TipoParalizacion } from '@/modules/tipoParalizacion/TipoParalizacion'
import { TipoProfesion } from '@/modules/tipoProfesion/TipoProfesion'
import { TipoProgramaObra } from '@/modules/tipoProgramaObra/TipoProgramaObra'
import { TipoRecepcion } from '@/modules/tipoRecepcion/TipoRecepcion'
import { TipoRedeterminacion } from '@/modules/tipoRedeterminacion/TipoRedeterminacion'
import { TipoRepresentante } from '@/modules/tipoRepresentante/TipoRepresentante'
import { TipoRescision } from '@/modules/tipoRescision/TipoRescision'
import { TipoTematicaObra } from '@/modules/tipoTematicaObra/TipoTematicaObra'
import { Pais } from '@/modules/pais/Pais'
import { Provincia } from '@/modules/provincia/Provincia'
import { Config } from '../../views/Config/Config'
import { Obra } from '@/modules/obra/Obra'
import { Ampliacion } from '@/modules/ampliacion/Ampliacion'
import { APG } from '@/modules/apg/APG'
import { Area } from '@/modules/area/Area'
import { Departamento } from '@/modules/departamento/Departamento'
import { Empresa } from '@/modules/empresa/Empresa'
import { FojaMedicion } from '@/modules/fojaMedicion/FojaMedicion'
import { Inspector } from '@/modules/inspector/Inspector'
import { InspectorObra } from '@/modules/inspectorObra/InspectorObra'
import { Localidad } from '@/modules/localidad/Localidad'
import { Modificacion } from '@/modules/modificacion/Modificacion'
import { PagoCertificacion } from '@/modules/pagoCertificacion/PagoCertificacion'
import { Paralizacion } from '@/modules/paralizacion/Paralizacion'
import { Recepcion } from '@/modules/recepcion/Recepcion'
import { Redeterminacion } from '@/modules/redeterminacion/Redeterminacion'
import { Representante } from '@/modules/representante/Representante'
import { RepresentanteEmpresa } from '@/modules/representanteEmpresa/RepresentanteEmpresa'
import { RepresentanteObra } from '@/modules/representanteObra/RepresentanteObra'
import { Rescision } from '@/modules/rescision/Rescision'

const ViewManager = () => (
  <div className="cmp-view-manager">
    <div className="default">
      <FavoriteViews />
    </div>

    <Ampliacion />
    <APG />
    <Area />
    <Departamento />
    <Empresa />
    <FojaMedicion />
    <Inspector />
    <InspectorObra />
    <Localidad />
    <Modificacion />
    <Obra />
    <PagoCertificacion />
    <Pais />
    <Paralizacion />
    <Provincia />
    <Recepcion />
    <Redeterminacion />
    <Representante />
    <RepresentanteEmpresa />
    <RepresentanteObra />
    <Rescision />
    <TipoContratacionObra />
    <TipoEnteObra />
    <TipoEstadoObra />
    <TipoFinanciamientoObra />
    <TipoInspector />
    <TipoModificacion />
    <TipoNivelArea />
    <TipoOrigenFinanciamientoObra />
    <TipoParalizacion />
    <TipoProfesion />
    <TipoProgramaObra />
    <TipoRecepcion />
    <TipoRedeterminacion />
    <TipoRepresentante />
    <TipoRescision />
    <TipoTematicaObra />

    {/* TODO: no debería ser una vista, si no abrirse desde un dropdown */}
    <Config />
  </div>
)

export default ViewManager
