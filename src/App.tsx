import './App.css'
import { Route, Switch } from 'wouter'
import { Admin, Login } from './pages'

const App = () => (
  <main>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </main>
)

export default App
