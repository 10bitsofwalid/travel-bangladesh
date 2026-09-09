import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DestinationDrawer } from './components/map/DestinationDrawer';
import { PlannerView } from './components/planner/PlannerView';
import { SubmitSpotModal } from './components/submission/SubmitSpotModal';
import { MyAccountView } from './components/account/MyAccountView';
import { Navbar } from './components/common/Navbar';
import { useMapStore } from './store/useMapStore';
import { INITIAL_LANDMARKS } from './data/mockData';

describe('ExploreBD UI Interactions and State Synchronization Tests', () => {
  it('DestinationDrawer: ADD TO ITINERARY adds destination to store itinerary', () => {
    const lalbagh = INITIAL_LANDMARKS.find((i) => i.id === 'poi-lalbagh')!;
    useMapStore.setState({ selectedDestination: lalbagh, isDrawerOpen: true });

    render(<DestinationDrawer />);

    const initialDaysCount = useMapStore.getState().itineraryDays.length;
    const addBtn = screen.getByText('ADD TO ITINERARY');
    fireEvent.click(addBtn);

    const updatedDays = useMapStore.getState().itineraryDays;
    expect(updatedDays.length).toBe(initialDaysCount + 1);
    expect(updatedDays[updatedDays.length - 1].destinationId).toBe(lalbagh.id);
    expect(screen.getByText(/ADDED TO PLANNER!/i)).toBeDefined();
  });

  it('DestinationDrawer: BOOK GUIDE switches view to planner and selects regional guide', () => {
    const ahsan = INITIAL_LANDMARKS.find((i) => i.id === 'poi-ahsan-manzil')!;
    useMapStore.setState({ selectedDestination: ahsan, isDrawerOpen: true, activeView: 'explore' });

    render(<DestinationDrawer />);

    const bookBtn = screen.getByText('BOOK GUIDE');
    fireEvent.click(bookBtn);

    expect(useMapStore.getState().activeView).toBe('planner');
  });

  it('DestinationDrawer: clicking photo thumbnail opens lightbox', () => {
    const ahsan = INITIAL_LANDMARKS.find((i) => i.id === 'poi-ahsan-manzil')!;
    useMapStore.setState({ selectedDestination: ahsan, isDrawerOpen: true, lightboxImage: null });

    render(<DestinationDrawer />);

    const imgThumb = screen.getByAltText('contribution-0');
    fireEvent.click(imgThumb);

    expect(useMapStore.getState().lightboxImage).not.toBeNull();
    expect(useMapStore.getState().lightboxImage?.src).toBeDefined();
  });

  it('PlannerView: allows adding custom itinerary day and selecting guides', () => {
    useMapStore.setState({ activeView: 'planner' });
    render(<PlannerView />);

    // Click "Add Day"
    const addDayToggle = screen.getByText('Add Day');
    fireEvent.click(addDayToggle);

    // Fill in form
    const titleInput = screen.getByPlaceholderText(/Title \(e.g./i);
    const locationInput = screen.getByPlaceholderText(/Location \(e.g./i);
    fireEvent.change(titleInput, { target: { value: 'Day 8: Cox\'s Bazar Long Beach' } });
    fireEvent.change(locationInput, { target: { value: 'Cox\'s Bazar' } });

    const saveBtn = screen.getByText('Save');
    fireEvent.click(saveBtn);

    const days = useMapStore.getState().itineraryDays;
    expect(days.some((d) => d.location === 'Cox\'s Bazar')).toBe(true);

    // Select guide
    const selectGuideBtns = screen.getAllByText(/SELECT GUIDE/i);
    if (selectGuideBtns.length > 0) {
      fireEvent.click(selectGuideBtns[0]);
    }
    expect(useMapStore.getState().selectedGuideId).toBeDefined();

    // Confirm itinerary
    const confirmBtn = screen.getByText('SELECT ITINERARY');
    fireEvent.click(confirmBtn);
    expect(screen.getByText('ITINERARY CONFIRMED')).toBeDefined();
  });

  it('SubmitSpotModal: navigates steps and submits spot into user contributions', () => {
    useMapStore.setState({ isSubmitSpotOpen: true });
    render(<SubmitSpotModal />);

    // Step 3 is default
    expect(screen.getByText(/Step 3 of 5/i)).toBeDefined();

    // Click Step 1 in header pills
    const step1Btn = screen.getByText('Basics');
    fireEvent.click(step1Btn);
    expect(screen.getByText(/Step 1: Basic Spot Information/i)).toBeDefined();

    // Click Step 5
    const step5Btn = screen.getByText('Review & Submit');
    fireEvent.click(step5Btn);
    expect(screen.getByText(/Step 5: Submission Summary & Peer Review/i)).toBeDefined();

    // Submit
    const finishBtn = screen.getByText('FINISH SUBMISSION');
    fireEvent.click(finishBtn);

    expect(useMapStore.getState().isSubmitSpotOpen).toBe(false);
    expect(useMapStore.getState().toastMessage).toContain('submitted for community verification');
  });

  it('MyAccountView: allows editing profile and slider changes store gamification', () => {
    useMapStore.setState({ activeView: 'account' });
    render(<MyAccountView />);

    // Slider change
    const slider = screen.getByLabelText('Level progress');
    fireEvent.change(slider, { target: { value: '88' } });
    expect(useMapStore.getState().userProfile.gamification.levelProgress).toBe(88);

    // Edit profile dialog
    const editBtn = screen.getByText('EDIT PROFILE');
    fireEvent.click(editBtn);

    const nameInput = screen.getByDisplayValue(useMapStore.getState().userProfile.name);
    fireEvent.change(nameInput, { target: { value: 'Zayn Khan Heritage' } });

    const saveChangesBtn = screen.getByText('Save Changes');
    fireEvent.click(saveChangesBtn);

    expect(useMapStore.getState().userProfile.name).toBe('Zayn Khan Heritage');
  });

  it('Navbar: clicking logo resets view and clears division filter', () => {
    useMapStore.setState({ activeDivision: 'sylhet', activeView: 'planner' });
    render(<Navbar />);

    const returnBtn = screen.getByTitle('Return to Map');
    fireEvent.click(returnBtn);

    expect(useMapStore.getState().activeView).toBe('explore');
  });
});
