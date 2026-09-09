import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { INITIAL_LANDMARKS } from './data/mockData';
import { DestinationDrawer } from './components/map/DestinationDrawer';
import { DivisionBar } from './components/common/DivisionBar';
import { SearchModal } from './components/common/SearchModal';
import { useMapStore } from './store/useMapStore';

describe('ExploreBD Real Information & Documents Verification', () => {
  it('contains 18 authentic landmarks across all 8 divisions of Bangladesh', () => {
    expect(INITIAL_LANDMARKS.length).toBe(18);

    const divisionIds = new Set(INITIAL_LANDMARKS.map((item) => item.divisionId));
    expect(divisionIds.has('div-dhaka')).toBe(true);
    expect(divisionIds.has('div-khulna')).toBe(true);
    expect(divisionIds.has('div-rajshahi')).toBe(true);
    expect(divisionIds.has('div-chittagong')).toBe(true);
    expect(divisionIds.has('div-sylhet')).toBe(true);
    expect(divisionIds.has('div-barisal')).toBe(true);
    expect(divisionIds.has('div-rangpur')).toBe(true);
    expect(divisionIds.has('div-mymensingh')).toBe(true);
  });

  it('verifies UNESCO World Heritage sites and their real dossiers', () => {
    const unescoSites = INITIAL_LANDMARKS.filter(
      (item) => item.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE'
    );
    expect(unescoSites.length).toBe(3); // Sixty Dome, Sundarbans, Somapura Mahavihara

    const paharpur = unescoSites.find((i) => i.id === 'poi-paharpur');
    expect(paharpur).toBeDefined();
    expect(paharpur?.heritageDetail?.archivalDocuments?.[0].archiveRepository).toContain(
      'Archaeological Survey of India'
    );

    const bagerhat = unescoSites.find((i) => i.id === 'poi-sixty-dome');
    expect(bagerhat).toBeDefined();
    expect(bagerhat?.heritageDetail?.archivalDocuments?.[0].archiveRepository).toContain(
      'UNESCO World Heritage Centre'
    );
  });

  it('verifies primary inscriptions and authentic archival documents', () => {
    const mahasthan = INITIAL_LANDMARKS.find((i) => i.id === 'poi-mahasthangarh');
    expect(mahasthan).toBeDefined();
    expect(mahasthan?.heritageDetail?.primaryInscriptions?.[0].script).toContain('Mauryan Brahmi');
    expect(mahasthan?.heritageDetail?.primaryInscriptions?.[0].translation).toContain('Pundranagara');

    const kantajew = INITIAL_LANDMARKS.find((i) => i.id === 'poi-kantajew');
    expect(kantajew).toBeDefined();
    expect(kantajew?.heritageDetail?.primaryInscriptions?.[0].translation).toContain('Maharaja Ramnath');
  });

  it('renders DestinationDrawer with archival documents, epigraphs, and transit logistics', () => {
    const ahsan = INITIAL_LANDMARKS.find((i) => i.id === 'poi-ahsan-manzil')!;
    useMapStore.setState({ selectedDestination: ahsan, isDrawerOpen: true });

    render(<DestinationDrawer />);

    // Test header & chronicles
    expect(screen.getByText('Ahsan Manzil')).toBeDefined();
    expect(screen.getByText('HISTORICAL CHRONICLES')).toBeDefined();

    // Click on DOCUMENTS & SOURCES tab
    const docTab = screen.getByText(/DOCUMENTS & SOURCES/i);
    expect(docTab).toBeDefined();
    fireEvent.click(docTab);

    // Verify archival records render
    expect(screen.getByText(/Deed of Waqf and French Kuthi Purchase Agreement/i)).toBeDefined();
    expect(screen.getByText(/All India Muhammadan Educational Conference/i)).toBeDefined();
    expect(screen.getByText(/Primary Epigraphs & Inscriptions/i)).toBeDefined();

    // Click on TRAVEL ROUTES tab
    const routesTab = screen.getByText('TRAVEL ROUTES');
    fireEvent.click(routesTab);
    expect(screen.getByText(/Access Summary/i)).toBeDefined();
    expect(screen.getByText(/Kamalapur Railway Station/i)).toBeDefined();

    // Click on TIMELINE tab
    const timelineTab = screen.getByText('TIMELINE');
    fireEvent.click(timelineTab);
    expect(screen.getByText('French Trading Kuthi')).toBeDefined();
    expect(screen.getByText('National Museum Inauguration')).toBeDefined();
  });

  it('renders DivisionBar with all 8 divisions of Bangladesh and handles selection', () => {
    render(<DivisionBar />);

    expect(screen.getByText('Dhaka')).toBeDefined();
    expect(screen.getByText('Chittagong')).toBeDefined();
    expect(screen.getByText('Sylhet')).toBeDefined();
    expect(screen.getByText('Rajshahi')).toBeDefined();
    expect(screen.getByText('Khulna')).toBeDefined();
    expect(screen.getByText('Barisal')).toBeDefined();
    expect(screen.getByText('Rangpur')).toBeDefined();
    expect(screen.getByText('Mymensingh')).toBeDefined();

    // Click on Rajshahi division
    const rajshahiBtn = screen.getByText('Rajshahi');
    fireEvent.click(rajshahiBtn);
    expect(useMapStore.getState().activeDivision).toBe('rajshahi');

    // Click again to toggle off
    fireEvent.click(rajshahiBtn);
    expect(useMapStore.getState().activeDivision).toBeNull();
  });

  it('searches by historical era, UNESCO status, and Bengali nomenclature in SearchModal', () => {
    useMapStore.setState({ isSearchOpen: true, filter: { ...useMapStore.getState().filter, searchQuery: 'Pala' } });

    render(<SearchModal />);

    // Somapura Mahavihara should match Pala era
    expect(screen.getAllByText('Somapura Mahavihara').length).toBeGreaterThan(0);
    expect(screen.getByText(/সোমপুর মহাবিহার/)).toBeDefined();
  });
});
