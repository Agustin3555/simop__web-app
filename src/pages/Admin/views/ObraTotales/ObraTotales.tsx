import { SchemeView } from '../../components'
import { ObraTotalesModel } from '../../models'

const ObraTotales = () => (
  <SchemeView scheme={ObraTotalesModel.scheme} add={false} edit={false} />
)

export default ObraTotales
