import { ViewActiveProvider } from './contexts'
import { Content, Nav } from './components'
import { ViewKey } from './enums'

/*
  TODO: en un futuro se podría obtener por local storage o por la cuenta la
  última view visitada
*/
const Admin = () => (
  <ViewActiveProvider initView={ViewKey.SUB_SECRETARIAS}>
    <Nav />
    <Content />
  </ViewActiveProvider>
)

export default Admin
