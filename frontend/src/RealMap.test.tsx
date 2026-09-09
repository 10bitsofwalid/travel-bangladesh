import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MapCanvas } from './components/map/MapCanvas';
import { useMapStore } from './store/useMapStore';
import { INITIAL_LANDMARKS } from './data/mockData';
import { BANGLADESH_DIVISIONS_GEOJSON, THEMATIC_TRAILS_GEO } from './data/bangladeshGeoData';

describe('Real Bangladesh Map Implementation Tests', () => {
  it('renders interactive Leaflet map surface with WGS84 coordinate attribution', () => {
    const { container } = render(<MapCanvas />);

    const mapSurface = container.querySelector('[role="region"]')!;
    expect(mapSurface).toBeDefined();
    expect(mapSurface.getAttribute('aria-label')).toBe('Interactive Map of Bangladesh');

    // Bottom attribution bar with WGS84
    expect(screen.getByText(/ExploreBD Geospatial Surface · WGS84/i)).toBeDefined();
  });

  it('renders floating visual map style switcher with Topography, Standard, and Satellite options', () => {
    render(<MapCanvas />);

    const styleToolbar = screen.getByTitle('Switch Map Visual Style');
    expect(styleToolbar).toBeDefined();

    const topoBtn = screen.getByRole('button', { name: /Topography/i });
    const standardBtn = screen.getByRole('button', { name: /Standard/i });
    const satelliteBtn = screen.getByRole('button', { name: /Satellite/i });

    expect(topoBtn).toBeDefined();
    expect(standardBtn).toBeDefined();
    expect(satelliteBtn).toBeDefined();

    // Switch to Satellite
    fireEvent.click(satelliteBtn);

    // Style button shows active satellite
    expect(satelliteBtn.className).toContain('bg-emerald-600');
  });

  it('renders and operates Zoom In, Zoom Out, and Reset Map View controls', () => {
    render(<MapCanvas />);

    const zoomInBtn = screen.getByLabelText('Zoom in');
    const zoomOutBtn = screen.getByLabelText('Zoom out');
    const resetBtn = screen.getByLabelText('Reset Map View');

    expect(zoomInBtn).toBeDefined();
    expect(zoomOutBtn).toBeDefined();
    expect(resetBtn).toBeDefined();

    fireEvent.click(zoomInBtn);
    fireEvent.click(zoomOutBtn);
    fireEvent.click(resetBtn);
  });

  it('contains valid GeoJSON for all 8 administrative divisions of Bangladesh', () => {
    expect(BANGLADESH_DIVISIONS_GEOJSON.features.length).toBe(8);

    const divisionSlugs = BANGLADESH_DIVISIONS_GEOJSON.features.map(
      (f) => f.properties?.slug
    );

    expect(divisionSlugs).toContain('dhaka');
    expect(divisionSlugs).toContain('chittagong');
    expect(divisionSlugs).toContain('sylhet');
    expect(divisionSlugs).toContain('rajshahi');
    expect(divisionSlugs).toContain('khulna');
    expect(divisionSlugs).toContain('barisal');
    expect(divisionSlugs).toContain('rangpur');
    expect(divisionSlugs).toContain('mymensingh');
  });

  it('contains authentic coordinate routes for all curated thematic trails', () => {
    expect(THEMATIC_TRAILS_GEO['mughal']).toBeDefined();
    expect(THEMATIC_TRAILS_GEO['buddhist']).toBeDefined();
    expect(THEMATIC_TRAILS_GEO['sylhet']).toBeDefined();
    expect(THEMATIC_TRAILS_GEO['sundarbans']).toBeDefined();

    // Mughal trail has Ahsan Manzil and Lalbagh
    const mughalWaypoints = THEMATIC_TRAILS_GEO['mughal'].waypoints;
    expect(mughalWaypoints.some((w) => w.name === 'Ahsan Manzil')).toBe(true);
    expect(mughalWaypoints.some((w) => w.name === 'Lalbagh Fort')).toBe(true);

    // Sylhet trail has Sreemangal and Jaflong
    const sylhetWaypoints = THEMATIC_TRAILS_GEO['sylhet'].waypoints;
    expect(sylhetWaypoints.some((w) => w.name === 'Sreemangal Tea Gardens')).toBe(true);
  });

  it('responds to store flyToTarget updates and selected landmark', () => {
    const ahsan = INITIAL_LANDMARKS[0];
    useMapStore.setState({
      selectedDestination: ahsan,
      isDrawerOpen: false,
      activeView: 'explore',
    });

    render(<MapCanvas />);

    // View Ahsan Manzil floating button appears when drawer is closed
    expect(screen.getByText(`View ${ahsan.name}`)).toBeDefined();

    // Trigger flyToLocation inside act
    act(() => {
      useMapStore.getState().flyToLocation(91.8687, 24.8949, 9.2);
    });
    expect(useMapStore.getState().flyToTarget?.latitude).toBe(24.8949);
    expect(useMapStore.getState().flyToTarget?.longitude).toBe(91.8687);
  });
});
