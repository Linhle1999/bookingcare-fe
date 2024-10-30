import { LoadingProvider } from './contexts/loadingProvider'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return <LoadingProvider>{routeElements}</LoadingProvider>
}

export default App
