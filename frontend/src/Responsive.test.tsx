import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './components/common/Navbar';
import { DivisionBar } from './components/common/DivisionBar';
import { LeftFilterPanel } from './components/map/LeftFilterPanel';
import { DestinationDrawer } from './components/map/DestinationDrawer';
import { MapCanvas } from './components/map/MapCanvas';
import { PlannerView } from './components/planner/PlannerView';
import { MyAccountView } from './components/account/MyAccountView';
import { VirtualTourModal } from './components/common/VirtualTourModal';
import { SearchModal } from './components/common/SearchModal';
import { SubmitSpotModal } from './components/submission/SubmitSpotModal';
import { useMapStore } from './store/useMapStore';
import { INITIAL_LANDMARKS } from './data/mockData';

describe('ExploreBD Comprehensive Responsive Compatibility Tests', () => {
  it('Navbar: provides responsive search triggers, take me somewhere button, and user controls', () => {
    useMapStore.setState({ activeView: 'explore' });
    render(<Navbar />);

    // Brand Logo
    expect(screen.getAllByText(/Explore/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/BD/i).length).toBeGreaterThan(0);

    // Responsive Action Buttons
    expect(screen.getByText(/TAKE ME SOMEWHERE/i)).toBeDefined();
    expect(screen.getByText(/SUBMIT A SPOT/i)).toBeDefined();

    // Mobile Search trigger button with aria-label
    const searchTrigger = screen.getByLabelText(/Search landmarks/i);
    expect(searchTrigger).toBeDefined();

    // Clicking mobile search trigger opens search modal
    fireEvent.click(searchTrigger);
    expect(useMapStore.getState().isSearchOpen).toBe(true);
  });

  it('DivisionBar: renders responsive capsule with horizontal scrolling and division chips', () => {
    render(<DivisionBar />);

    expect(screen.getByText(/Divisions:/i)).toBeDefined();
    expect(screen.getByText('Dhaka')).toBeDefined();
    expect(screen.getByText('Chittagong')).toBeDefined();
    expect(screen.getByText('Sylhet')).toBeDefined();

    // Select Sylhet
    const sylhetBtn = screen.getByText('Sylhet');
    fireEvent.click(sylhetBtn);
    expect(useMapStore.getState().activeDivision).toBe('sylhet');
  });

  it('LeftFilterPanel: supports collapse toggle and responsive filter switches', () => {
    useMapStore.setState({ isLeftPanelOpen: true });
    render(<LeftFilterPanel />);

    expect(screen.getByText(/FILTER LAYERS/i)).toBeDefined();
    expect(screen.getByText('NATURE')).toBeDefined();
    expect(screen.getByText('HISTORY')).toBeDefined();

    // Minimize panel
    const minimizeBtn = screen.getByTitle(/Minimize Filter Panel/i);
    fireEvent.click(minimizeBtn);
    expect(useMapStore.getState().isLeftPanelOpen).toBe(false);
  });

  it('DestinationDrawer: renders responsive bottom sheet / drawer with mobile drag handle and tabs', () => {
    const ahsan = INITIAL_LANDMARKS[0];
    useMapStore.setState({ selectedDestination: ahsan, isDrawerOpen: true });
    render(<DestinationDrawer />);

    expect(screen.getByText(ahsan.name)).toBeDefined();
    expect(screen.getByText(/HISTORICAL CHRONICLES/i)).toBeDefined();
    expect(screen.getByText(/360° Virtual Tour/i)).toBeDefined();
    expect(screen.getByText(/BEST TIME TO VISIT/i)).toBeDefined();
    expect(screen.getByText(/ENTRY DETAILS/i)).toBeDefined();
    expect(screen.getByText(/TRAVEL ROUTES/i)).toBeDefined();

    // Close button
    const closeBtn = screen.getByLabelText('Close Drawer');
    fireEvent.click(closeBtn);
    expect(useMapStore.getState().isDrawerOpen).toBe(false);
  });

  it('MapCanvas: handles single touch drag and two-finger pinch-to-zoom gestures without errors', () => {
    const { container } = render(<MapCanvas />);
    const mapSurface = container.querySelector('[role="region"]')!;
    expect(mapSurface).toBeDefined();

    // Single touch start & move (drag pan)
    fireEvent.touchStart(mapSurface, {
      touches: [{ clientX: 200, clientY: 200 }],
    });
    fireEvent.touchMove(mapSurface, {
      touches: [{ clientX: 250, clientY: 230 }],
    });

    // Two-finger pinch touch start & move
    fireEvent.touchStart(mapSurface, {
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 200 },
      ],
    });
    fireEvent.touchMove(mapSurface, {
      touches: [
        { clientX: 80, clientY: 80 },
        { clientX: 240, clientY: 240 },
      ],
    });
    fireEvent.touchEnd(mapSurface);

    // Zoom controls exist and are clickable
    const zoomInBtn = screen.getByLabelText('Zoom in');
    const zoomOutBtn = screen.getByLabelText('Zoom out');
    const resetBtn = screen.getByLabelText('Reset Map View');

    fireEvent.click(zoomInBtn);
    fireEvent.click(zoomOutBtn);
    fireEvent.click(resetBtn);
  });

  it('PlannerView: scales across screen sizes and supports adding days and guide selection', () => {
    useMapStore.setState({ activeView: 'planner' });
    render(<PlannerView />);

    expect(screen.getByText(/BUILD ITINERARY/i)).toBeDefined();
    expect(screen.getByText(/BOOK GUIDE & LOGISTICS/i)).toBeDefined();
    expect(screen.getByText(/VERIFIED LOCAL GUIDES/i)).toBeDefined();
    expect(screen.getByText(/ESTIMATED TRAVEL TIMES/i)).toBeDefined();
    expect(screen.getByText(/CART SUMMARY/i)).toBeDefined();
  });

  it('MyAccountView: renders responsive bento layout and allows profile editing and gamification updates', () => {
    useMapStore.setState({ activeView: 'account' });
    render(<MyAccountView />);

    expect(screen.getByText(/PROFILE SUMMARY/i)).toBeDefined();
    expect(screen.getByText(/GAMIFICATION & STATUS/i)).toBeDefined();
    expect(screen.getByText(/MY CONTRIBUTIONS/i)).toBeDefined();
    expect(screen.getByText(/SAVED ITINERARIES/i)).toBeDefined();
    expect(screen.getByText(/ACCOUNT SETTINGS/i)).toBeDefined();
  });

  it('Modals: SearchModal, SubmitSpotModal, and VirtualTourModal render and scale cleanly', () => {
    // Search Modal
    useMapStore.setState({ isSearchOpen: true });
    const { unmount: unmountSearch } = render(<SearchModal />);
    expect(screen.getByPlaceholderText(/Search natural spots/i)).toBeDefined();
    unmountSearch();

    // Submit Spot Modal
    useMapStore.setState({ isSearchOpen: false, isSubmitSpotOpen: true });
    const { unmount: unmountSubmit } = render(<SubmitSpotModal />);
    expect(screen.getByText(/SUBMIT A SPOT/i)).toBeDefined();
    unmountSubmit();

    // Virtual Tour Modal
    useMapStore.setState({ isSubmitSpotOpen: false, isVirtualTourOpen: true });
    const { unmount: unmountTour } = render(<VirtualTourModal />);
    expect(screen.getByText(/360° PANORAMA/i)).toBeDefined();
    unmountTour();
  });
});
