import './Admin.css'
import { useNavState } from './hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ViewManager, Nav, Header } from './components'
import { NavStateProvider, ViewsProvider } from './contexts'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const ContextualizedAdmin = () => {
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
        {/* <FavoriteViewsProvider> */}
        <ContextualizedAdmin />
        {/* </FavoriteViewsProvider> */}
      </NavStateProvider>
    </ViewsProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default Admin
