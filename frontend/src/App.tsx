import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/common/Navbar';
import { MapCanvas } from './components/map/MapCanvas';
import { LeftFilterPanel } from './components/map/LeftFilterPanel';
import { DestinationDrawer } from './components/map/DestinationDrawer';
import { DivisionBar } from './components/common/DivisionBar';
import { MyAccountView } from './components/account/MyAccountView';
import { SubmitSpotModal } from './components/submission/SubmitSpotModal';
import { PlannerView } from './components/planner/PlannerView';
import { VirtualTourModal } from './components/common/VirtualTourModal';
import { SearchModal } from './components/common/SearchModal';
import { useMapStore } from './store/useMapStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const MainLayout: React.FC = () => {
  const { activeView } = useMapStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#d6e5d8] select-none font-sans">
      {/* Top Floating Glass Navigation Bar */}
      <Navbar />

      {/* Primary Geospatial Surface (Always rendered as background or interactive) */}
      <main className="w-full h-full">
        <MapCanvas />
      </main>

      {/* Explore View Overlays */}
      {activeView === 'explore' && (
        <>
          <DivisionBar />
          <LeftFilterPanel />
          <DestinationDrawer />
        </>
      )}

      {/* My Account View Overlay */}
      {activeView === 'account' && (
        <div className="absolute inset-0 z-20 bg-slate-900/10 backdrop-blur-sm">
          <MyAccountView />
        </div>
      )}

      {/* Planner & Guide Logistics View Overlay */}
      {activeView === 'planner' && <PlannerView />}

      {/* Modals */}
      <SubmitSpotModal />
      <VirtualTourModal />
      <SearchModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout />
    </QueryClientProvider>
  );
};

export default App;
