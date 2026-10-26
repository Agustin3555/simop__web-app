import './Admin.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { publicInstance } from '@/services/config'
import { apiAdminPath } from '@/env'
import { useNavState } from './hooks/useNavState.hook'
import { NavStateProvider } from './providers/navState.provider'
import { ViewsProvider } from './providers/views.provider'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import ViewManager from './components/ViewManager/ViewManager'

const wakeUp = async () => await publicInstance.get(`${apiAdminPath}/ping`)
wakeUp()

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const AdminBody = () => {
  const { isOpen } = useNavState()

  return (
    <div className="cmp-admin" data-nav-open={isOpen}>
      <Nav />
      <div className="main-panel">
        <Header />
        <ViewManager />
      </div>
    </div>
  )
}

const Admin = () => (
  <QueryClientProvider {...{ client }}>
    <ViewsProvider>
      <NavStateProvider>
        <AdminBody />
      </NavStateProvider>
    </ViewsProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default Admin
