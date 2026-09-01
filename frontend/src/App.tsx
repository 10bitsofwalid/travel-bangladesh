import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeaderNav } from './components/common/HeaderNav';
import { DivisionBar } from './components/common/DivisionBar';
import { MapCanvas } from './components/map/MapCanvas';
import { DiscoveryDrawer } from './components/common/DiscoveryDrawer';
import { SearchModal } from './components/common/SearchModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative w-screen h-screen overflow-hidden bg-dark-900 select-none">
        {/* Floating Glass Navigation Bar */}
        <HeaderNav />

        {/* Division Fast-Jump Navigation Pills */}
        <DivisionBar />

        {/* Primary Geospatial Map Surface */}
        <main className="w-full h-full">
          <MapCanvas />
        </main>

        {/* Contextual POI Discovery Drawer */}
        <DiscoveryDrawer />

        {/* Search Modal */}
        <SearchModal />
      </div>
    </QueryClientProvider>
  );
};

export default App;
