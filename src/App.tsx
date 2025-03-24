import './App.css'
import { Route, Switch } from 'wouter'
import { Admin, Login, NotFound } from './pages'
import { Snackbar } from './components'

const App = () => (
  <main>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
    <Snackbar />
  </main>
)

export default App
