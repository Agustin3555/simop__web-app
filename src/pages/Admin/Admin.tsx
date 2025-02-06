import { lastVisitedViewEntity } from '@/services/localStorage'
import { Content, Nav, ViewActiveProvider } from './components'
import { SubSecretariaModel } from './models'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const lastVisitedView = lastVisitedViewEntity.get()

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const Admin = () => (
  <ViewActiveProvider
    initView={lastVisitedView || SubSecretariaModel.scheme.key}
  >
    <QueryClientProvider {...{ client }}>
      <Nav />
      <Content />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ViewActiveProvider>
)

export default Admin
