import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaginationExample from "./components/PaginationExample";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginationExample />
    </QueryClientProvider>
  );
}
