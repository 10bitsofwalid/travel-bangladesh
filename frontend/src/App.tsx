import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { X } from 'lucide-react';
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
  const { activeView, lightboxImage, setLightboxImage } = useMapStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#d6e5d8] select-none font-sans">
      {/* Top Floating Glass Navigation Bar */}
      <Navbar />

      {/* Primary Geospatial Surface */}
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

      {/* Global Image Lightbox Preview Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-in fade-in cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[88vh] rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl border border-white/40 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-lg transition-all z-10 cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            {lightboxImage.title && (
              <div className="p-3 text-center">
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                  {lightboxImage.title}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
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
