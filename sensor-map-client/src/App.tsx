import './App.css'
import { BaseMap } from "./components/BaseMap/BaseMap";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterPanel } from "./components/FilterPanel/FilterPanel";

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
      <FilterPanel />
    </QueryClientProvider>
  )
}

export default App