import './Admin.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { apiAdminPath } from '@/env'
import { ViewsProvider } from './providers/views.provider'
import { publicInstance } from '@/services/config'
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
  return (
    <div className="cmp-admin">
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
      <AdminBody />
    </ViewsProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default Admin
