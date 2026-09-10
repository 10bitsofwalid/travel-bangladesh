import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useMapStore } from './store/useMapStore';
import { DestinationDrawer } from './components/map/DestinationDrawer';
import { MapCanvas } from './components/map/MapCanvas';
import { INITIAL_LANDMARKS } from './data/mockData';
import {
  RESIDENCE_PRESETS,
  calculateResidenceRoute,
} from './data/routeEngine';

describe('Residence to Destination Routing System', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useMapStore.setState({
        selectedTrail: null,
        selectedDestination: null,
        isDrawerOpen: false,
        isRouteActive: false,
        userResidence: RESIDENCE_PRESETS[0], // Dhaka
        activeTransportMode: 'road',
      });
    });
  });

  it('verifies selectedTrail is null by default on startup (no trail selected initially)', () => {
    expect(useMapStore.getState().selectedTrail).toBeNull();
  });

  it('provides 8 residence presets covering all divisions of Bangladesh', () => {
    expect(RESIDENCE_PRESETS.length).toBe(8);
    const names = RESIDENCE_PRESETS.map((p) => p.name);
    expect(names).toContain('Dhaka');
    expect(names).toContain('Chittagong');
    expect(names).toContain('Sylhet');
    expect(names).toContain('Rajshahi');
    expect(names).toContain('Khulna');
    expect(names).toContain('Barisal');
    expect(names).toContain('Rangpur');
    expect(names).toContain('Mymensingh');
  });

  it('calculates realistic highway routing corridors from Dhaka', () => {
    const dhaka = RESIDENCE_PRESETS.find((p) => p.id === 'res-dhaka')!;
    
    // Test to Sixty Dome Mosque in Bagerhat / Khulna (Should use Padma Bridge corridor)
    const sixtyDome = INITIAL_LANDMARKS.find((i) => i.id === 'poi-sixty-dome')!;
    const southRoute = calculateResidenceRoute(dhaka, sixtyDome);
    expect(southRoute.roadDistanceKm).toBeGreaterThan(150);
    expect(southRoute.coordinates.length).toBeGreaterThan(2);
    const roadMode = southRoute.modes.find((m) => m.mode === 'road');
    expect(roadMode?.operatorOrHighway).toContain('Padma Bridge');

    // Test to Mahasthangarh in Bogra / Rajshahi (Should use Jamuna Bridge corridor)
    const mahasthan = INITIAL_LANDMARKS.find((i) => i.id === 'poi-mahasthangarh')!;
    const northRoute = calculateResidenceRoute(dhaka, mahasthan);
    expect(northRoute.roadDistanceKm).toBeGreaterThan(150);
    const northRoad = northRoute.modes.find((m) => m.mode === 'road');
    expect(northRoad?.operatorOrHighway).toContain('Jamuna');

    // Test to Sreemangal in Sylhet (Should use N2 corridor)
    const sreemangal = INITIAL_LANDMARKS.find((i) => i.id === 'poi-sreemangal')!;
    const sylhetRoute = calculateResidenceRoute(dhaka, sreemangal);
    expect(sylhetRoute.roadDistanceKm).toBeGreaterThan(130);
    const sylhetRoad = sylhetRoute.modes.find((m) => m.mode === 'road');
    expect(sylhetRoad?.operatorOrHighway).toContain('N2');
  });

  it('renders DestinationDrawer with Residence Route Navigator and handles show, switch, and remove route options', () => {
    const sixtyDome = INITIAL_LANDMARKS.find((i) => i.id === 'poi-sixty-dome')!;
    act(() => {
      useMapStore.setState({
        selectedDestination: sixtyDome,
        isDrawerOpen: true,
        isRouteActive: false,
      });
    });

    render(<DestinationDrawer />);

    // Check quick route strip under hero
    expect(screen.getByText(/From Dhaka/i)).toBeDefined();
    const routeOnMapBtn = screen.getByRole('button', { name: /Route On Map/i });
    expect(routeOnMapBtn).toBeDefined();

    // Toggle route ON from quick strip
    fireEvent.click(routeOnMapBtn);
    expect(useMapStore.getState().isRouteActive).toBe(true);

    // Now verify the button switched to "Remove Route"
    const removeBtn = screen.getByRole('button', { name: /Remove Route/i });
    expect(removeBtn).toBeDefined();

    // Toggle route OFF (Unselect route)
    fireEvent.click(removeBtn);
    expect(useMapStore.getState().isRouteActive).toBe(false);

    // Click on TRAVEL ROUTES tab
    const routesTab = screen.getByText('TRAVEL ROUTES');
    fireEvent.click(routesTab);

    // Check Journey From Residence Navigator
    expect(screen.getByText('Journey From Residence')).toBeDefined();
    expect(screen.getByText('Show on Map')).toBeDefined();
    expect(screen.getByText(/Primary Corridor:/i)).toBeDefined();

    // Toggle "Show on Map" from routes tab
    const mapToggleBtn = screen.getByText('Show on Map');
    fireEvent.click(mapToggleBtn);
    expect(useMapStore.getState().isRouteActive).toBe(true);

    // Verify unselect route button appears and works
    const unselectBtn = screen.getByRole('button', { name: /Unselect Route/i });
    expect(unselectBtn).toBeDefined();
    fireEvent.click(unselectBtn);
    expect(useMapStore.getState().isRouteActive).toBe(false);

    // Re-enable and switch departure residence to Chittagong
    fireEvent.click(screen.getByText('Show on Map'));
    expect(useMapStore.getState().isRouteActive).toBe(true);
    const selectElem = screen.getByLabelText('Select Departure Residence') as HTMLSelectElement;
    fireEvent.change(selectElem, { target: { value: 'res-chittagong' } });
    expect(useMapStore.getState().userResidence.id).toBe('res-chittagong');

    // Verify transit options can be toggled
    const railBtn = screen.getByRole('button', { name: /rail/i });
    fireEvent.click(railBtn);
    expect(useMapStore.getState().activeTransportMode).toBe('rail');
    expect(screen.getByText(/Bangladesh Railway/i)).toBeDefined();
  });

  it('renders floating journey pill on MapCanvas and unselects route when clicked', () => {
    const sixtyDome = INITIAL_LANDMARKS.find((i) => i.id === 'poi-sixty-dome')!;
    act(() => {
      useMapStore.setState({
        selectedDestination: sixtyDome,
        isRouteActive: true,
      });
    });

    render(<MapCanvas />);

    // Verify floating pill appears with origin and destination
    expect(screen.getByText('Dhaka')).toBeDefined();
    expect(screen.getAllByText(/Sixty Dome Mosque/i).length).toBeGreaterThanOrEqual(1);
    const removeBtns = screen.getAllByTitle('Remove or Unselect Route from Map');
    expect(removeBtns.length).toBeGreaterThanOrEqual(1);

    // Click remove route button
    fireEvent.click(removeBtns[0]);
    expect(useMapStore.getState().isRouteActive).toBe(false);
  });
});
