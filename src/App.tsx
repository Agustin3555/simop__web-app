import './App.css'
import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'
import { Snackbar } from './components'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'

const Admin = lazy(() => import('./pages/Admin/Admin'))

const App = () => (
  <main className="cmp-app">
    <Switch>
      <Route path="/" component={Login} />
      <Route
        path="/admin"
        component={() => (
          <Suspense>
            <Admin />
          </Suspense>
        )}
      />
      <Route component={NotFound} />
    </Switch>
    <Snackbar />
  </main>
)

export default App
