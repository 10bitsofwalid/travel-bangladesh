import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlannerView } from './components/planner/PlannerView';
import { useMapStore } from './store/useMapStore';

describe('PlannerView: Responsive & Functional Viewing Site & Surroundings', () => {
  beforeEach(() => {
    useMapStore.setState({
      activeView: 'planner',
      activeItineraryDay: 1,
      selectedGuideId: 'guide-1',
      selectedHotelId: null,
      selectedTransportOptionId: 'transport-private-van',
      flyToTarget: null
    });
  });

  it('zooms into the exact landmark coordinates (zoom: 14) and updates selectedDestination when selecting an itinerary day', () => {
    render(<PlannerView />);

    // Day 1 is default (Ahsan Manzil)
    expect(screen.getByText(/Day Site & Surroundings/i)).toBeDefined();
    expect(screen.getByText(/THE PINK PALACE/i)).toBeDefined();

    // Select Day 2 (Sreemangal)
    const day2Card = screen.getByText(/Day 2: Sylhet - Tea Gardens & Hidden Falls/i);
    fireEvent.click(day2Card);

    // Should update active day
    expect(useMapStore.getState().activeItineraryDay).toBe(2);

    // Should fly to Sreemangal coordinates (longitude: 91.7296, latitude: 24.3065, zoom: 14)
    const flyTarget = useMapStore.getState().flyToTarget;
    expect(flyTarget).not.toBeNull();
    expect(flyTarget?.zoom).toBe(14);
    expect(flyTarget?.latitude).toBeCloseTo(24.3065, 1);
    expect(flyTarget?.longitude).toBeCloseTo(91.7296, 1);

    // Should update selected destination in store
    expect(useMapStore.getState().selectedDestination?.id).toBe('poi-sreemangal');
  });

  it('displays detailed place information, immediate natural setting, surrounding attractions, and culinary highlights', () => {
    render(<PlannerView />);

    // Check Day 1 (Ahsan Manzil) surroundings
    expect(screen.getByText(/IMMEDIATE NATURAL & GEOGRAPHIC SETTING/i)).toBeDefined();
    expect(screen.getByText(/bustling northern bank of the Buriganga River in Islampur/i)).toBeDefined();

    // Surrounding attractions within 1-15 km
    expect(screen.getByText(/SURROUNDINGS & NEARBY ATTRACTIONS/i)).toBeDefined();
    expect(screen.getByText('Lalbagh Fort')).toBeDefined();
    expect(screen.getByText('3.2 km')).toBeDefined();
    expect(screen.getByText('Tara Masjid (Star Mosque)')).toBeDefined();
    expect(screen.getByText('Sadarghat Riverfront Launch Terminal')).toBeDefined();

    // Culinary highlights
    expect(screen.getByText(/LOCAL CULINARY HIGHLIGHTS/i)).toBeDefined();
    expect(screen.getByText(/Old Dhaka Kacchi Biryani, Bakarkhani bread/i)).toBeDefined();
  });

  it('allows switching to Book Hotel tab, shows curated accommodations, and updates cart total', () => {
    render(<PlannerView />);

    // Click "Book Hotel & Stays" tab
    const hotelTabBtn = screen.getByText(/Book Hotel & Stays/i);
    fireEvent.click(hotelTabBtn);

    expect(screen.getByText(/Pan Pacific Sonargaon Heritage Hotel/i)).toBeDefined();
    expect(screen.getByText(/Old Dhaka Heritage Boutique Inn/i)).toBeDefined();

    // Click Book Stay for Pan Pacific
    const bookStayBtns = screen.getAllByText(/BOOK STAY/i);
    expect(bookStayBtns.length).toBeGreaterThan(0);
    fireEvent.click(bookStayBtns[0]);

    // Hotel should now be selected in store
    expect(useMapStore.getState().selectedHotelId).toBe('hotel-pan-pacific');

    // Cart summary should reflect accommodation addition
    expect(screen.getByText(/Curated Accommodation:/i)).toBeDefined();
  });

  it('allows switching to Transport & Logistics tab and choosing transport options', () => {
    render(<PlannerView />);

    // Click "Transport & Logistics" tab
    const transportTabBtn = screen.getByText(/Transport & Logistics/i);
    fireEvent.click(transportTabBtn);

    expect(screen.getByText(/Private AC Tourist HiAce \/ Noah Van/i)).toBeDefined();
    expect(screen.getByText(/Bangladesh Railway Intercity AC Chair/i)).toBeDefined();
    expect(screen.getByText(/BIWTA \/ Green Line VIP River Cruiser Cabin/i)).toBeDefined();

    // Select train option
    const selectTrainBtn = screen.getAllByText(/SELECT TRANSPORT/i)[0];
    fireEvent.click(selectTrainBtn);

    expect(useMapStore.getState().selectedTransportOptionId).toBeDefined();
  });

  it('supports interactive map zoom buttons on the viewing site card', () => {
    render(<PlannerView />);

    // Click "Zoom Site (14x)"
    const zoom14Btn = screen.getByText(/Zoom Site \(14x\)/i);
    fireEvent.click(zoom14Btn);

    expect(useMapStore.getState().flyToTarget?.zoom).toBe(14);
  });

  it('supports mobile segmented toggle between Schedule and Hub', () => {
    render(<PlannerView />);

    // Mobile buttons
    const scheduleBtn = screen.getByText(/Schedule \(7d\)/i);
    const siteBookingsBtn = screen.getByText(/Site & Bookings/i);
    const peekMapBtn = screen.getByText(/Peek Map/i);

    expect(scheduleBtn).toBeDefined();
    expect(siteBookingsBtn).toBeDefined();
    expect(peekMapBtn).toBeDefined();

    fireEvent.click(siteBookingsBtn);
    fireEvent.click(peekMapBtn);
    expect(screen.getByText(/Show Panels/i)).toBeDefined();
  });
});
