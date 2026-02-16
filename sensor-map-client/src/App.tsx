import './App.css'
import { BaseMap } from "./components/BaseMap/BaseMap";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BaseMap />
    </QueryClientProvider>
  )
}

export default App