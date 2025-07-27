import './Admin.css'
import { useMetaModels, useNavState } from './hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteViewsProvider } from './contexts/favoriteViews.context'
import { MetaModelsProvider } from './contexts/metaModels.context'
import { NavStateProvider } from './contexts/navState.context'
import { ViewsProvider } from './contexts/views.context'
import { ViewsInfoProvider } from './contexts/viewsInfo.context'
import { Header, Nav, ViewManager } from './components'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const ContextualizedAdmin = () => {
  const { allReady } = useMetaModels()
  const { isOpen } = useNavState()

  return (
    allReady && (
      <div className="cmp-admin" data-nav-open={isOpen}>
        <Nav />
        <div className="main-panel">
          <Header />
          <ViewManager />
        </div>
      </div>
    )
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
