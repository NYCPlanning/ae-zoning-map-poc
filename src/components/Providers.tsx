import { StreetscapeProvider } from "@nycplanning/streetscape";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <StreetscapeProvider>{children}</StreetscapeProvider>
  </QueryClientProvider>
);
