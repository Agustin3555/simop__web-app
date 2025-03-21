import './App.css'
import { Route, Switch } from 'wouter'
import { Admin, Login } from './pages'
import { Snackbar } from './components'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'

const App = () => (
  <main>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFoundPage} />
    </Switch>
    <Snackbar />
  </main>
)

export default App
