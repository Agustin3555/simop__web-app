import './Content.css'
import { Departamentos, Direcciones, SubSecretarias } from '../../views'

const Content = () => (
  <div className="cmp-content">
    <SubSecretarias />
    <Direcciones />
    <Departamentos />
  </div>
)

export default Content
