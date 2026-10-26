import './ViewManager.css'
import FavoriteViews from '../FavoriteViews/FavoriteViews'
// import Ampliacion from '../../views/Ampliacion/Ampliacion'
// import APG from '../../views/APG/APG'
// import Area from '../../views/Area/Area'
// import Departamento from '../../views/Departamento/Departamento'
// import Empresa from '../../views/Empresa/Empresa'
// import FojaMedicion from '../../views/FojaMedicion/FojaMedicion'
// import Inspector from '../../views/Inspector/Inspector'
// import InspectorObra from '../../views/InspectorObra/InspectorObra'
// import Localidad from '../../views/Localidad/Localidad'
// import Modificacion from '../../views/Modificacion/Modificacion'
// import Obra from '../../views/Obra/Obra'
// import PagoCertificacion from '../../views/PagoCertificacion/PagoCertificacion'
// import Paralizacion from '../../views/Paralizacion/Paralizacion'
// import Recepcion from '../../views/Recepcion/Recepcion'
// import Redeterminacion from '../../views/Redeterminacion/Redeterminacion'
// import Representante from '../../views/Representante/Representante'
// import RepresentanteEmpresa from '../../views/RepresentanteEmpresa/RepresentanteEmpresa'
// import RepresentanteObra from '../../views/RepresentanteObra/RepresentanteObra'
// import Rescision from '../../views/Rescision/Rescision'
import { TipoContratacionObra } from '@/modules/tipoContratacionObra/components/TipoContratacionObra/TipoContratacionObra'
import { TipoEnteObra } from '@/modules/tipoEnteObra/components/TipoEnteObra/TipoEnteObra'
import { TipoEstadoObra } from '@/modules/tipoEstadoObra/components/TipoEstadoObra/TipoEstadoObra'
import { TipoFinanciamientoObra } from '@/modules/tipoFinanciamientoObra/components/TipoFinanciamientoObra/TipoFinanciamientoObra'
import { TipoInspector } from '@/modules/tipoInspector/components/TipoInspector/TipoInspector'
import { TipoModificacion } from '@/modules/tipoModificacion/components/TipoModificacion/TipoModificacion'
import { TipoNivelArea } from '@/modules/tipoNivelArea/components/TipoNivelArea/TipoNivelArea'
import { TipoOrigenFinanciamientoObra } from '@/modules/tipoOrigenFinanciamientoObra/components/TipoOrigenFinanciamientoObra/TipoOrigenFinanciamientoObra'
import { TipoParalizacion } from '@/modules/tipoParalizacion/components/TipoParalizacion/TipoParalizacion'
import { TipoProfesion } from '@/modules/tipoProfesion/components/TipoProfesion/TipoProfesion'
import { TipoProgramaObra } from '@/modules/tipoProgramaObra/components/TipoProgramaObra/TipoProgramaObra'
import { TipoRecepcion } from '@/modules/tipoRecepcion/components/TipoRecepcion/TipoRecepcion'
import { TipoRedeterminacion } from '@/modules/tipoRedeterminacion/components/TipoRedeterminacion/TipoRedeterminacion'
import { TipoRepresentante } from '@/modules/tipoRepresentante/components/TipoRepresentante/TipoRepresentante'
import { TipoRescision } from '@/modules/tipoRescision/components/TipoRescision/TipoRescision'
import { TipoTematicaObra } from '@/modules/tipoTematicaObra/components/TipoTematicaObra/TipoTematicaObra'

import { Config } from '../../views/Config/Config'
import { Pais } from '@/modules/pais/components/Pais/Pais'
import { Provincia } from '@/modules/provincia/components/Provincia/Provincia'

const ViewManager = () => (
  <div className="cmp-view-manager">
    <div className="default">
      <FavoriteViews />
    </div>

    {/* TODO: no debería ser una vista, si no abrirse desde un dropdown */}
    <Config />

    {/* <Ampliacion /> */}
    {/* <APG /> */}
    {/* <Area /> */}
    {/* <Departamento /> */}
    {/* <Empresa /> */}
    {/* <FojaMedicion /> */}
    {/* <Inspector /> */}
    {/* <InspectorObra /> */}
    {/* <Localidad /> */}
    {/* <Modificacion /> */}
    {/* <Obra /> */}
    {/* <PagoCertificacion /> */}
    <Pais />
    {/* <Paralizacion /> */}
    <Provincia />
    {/* <Recepcion /> */}
    {/* <Redeterminacion /> */}
    {/* <Representante /> */}
    {/* <RepresentanteEmpresa /> */}
    {/* <RepresentanteObra /> */}
    {/* <Rescision /> */}
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
  </div>
)

export default ViewManager

// TODO: constantes a revivir
