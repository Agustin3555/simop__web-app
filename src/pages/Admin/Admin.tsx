import './Admin.css'
import { useMetaModels, useNavState } from './hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ViewManager, Nav, Header } from './components'
import {
  FavoriteViewsProvider,
  MetaModelsProvider,
  NavStateProvider,
  ViewsInfoProvider,
  ViewsProvider,
} from './contexts'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const ContextualizedAdmin = () => {
  const { isOpen } = useNavState()

  const { metaModels } = useMetaModels()

  return (
    <div className="cmp-admin" data-nav-open={isOpen}>
      <pre>{Object.keys(metaModels).length}</pre>
      <pre>{JSON.stringify(Object.keys(metaModels), undefined, 1)}</pre>
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
    <MetaModelsProvider>
      <ViewsInfoProvider>
        <ViewsProvider>
          <NavStateProvider>
            <FavoriteViewsProvider>
              <ContextualizedAdmin />
            </FavoriteViewsProvider>
          </NavStateProvider>
        </ViewsProvider>
      </ViewsInfoProvider>
    </MetaModelsProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default Admin
