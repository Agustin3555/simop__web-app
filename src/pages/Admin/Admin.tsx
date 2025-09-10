import './Admin.css'
import { useMetaModels, useNavState } from './hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Header, Nav, ViewManager } from './components'
import {
  ConfigsProvider,
  FavoriteViewsProvider,
  MetaModelsProvider,
  NavStateProvider,
  ViewsInfoProvider,
  ViewsProvider,
} from './providers'
import { publicInstance } from '@/services/config'

const wakeUp = async () => await publicInstance.get('Tel0YWwsIEFtaWdv/ping')
wakeUp()

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const AdminBody = () => {
  const { allReady } = useMetaModels()
  const { isOpen } = useNavState()

  if (!allReady) return null

  return (
    <ConfigsProvider>
      <div className="cmp-admin" data-nav-open={isOpen}>
        <Nav />
        <div className="main-panel">
          <Header />
          <ViewManager />
        </div>
      </div>
    </ConfigsProvider>
  )
}

const Admin = () => (
  <QueryClientProvider {...{ client }}>
    <MetaModelsProvider>
      <ViewsInfoProvider>
        <ViewsProvider>
          <NavStateProvider>
            <FavoriteViewsProvider>
              <AdminBody />
            </FavoriteViewsProvider>
          </NavStateProvider>
        </ViewsProvider>
      </ViewsInfoProvider>
    </MetaModelsProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default Admin
