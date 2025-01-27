import './App.css'
import { Route, Switch } from 'wouter'
import { Admin, Login } from './pages'
import { Snackbar } from './components'

const App = () => (
  <main>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/admin" component={Admin} />
    </Switch>
    <Snackbar />
  </main>
)

export default App
