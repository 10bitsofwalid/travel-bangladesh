import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyAccountView } from './components/account/MyAccountView';
import { SubmitSpotModal } from './components/submission/SubmitSpotModal';
import { PlannerView } from './components/planner/PlannerView';
import { useMapStore } from './store/useMapStore';

describe('ExploreBD Extended Views and Interactions', () => {
  it('renders MyAccountView with Profile Summary, Gamification, Contributions, and Settings (Image 1)', () => {
    render(<MyAccountView />);
    
    // Card 1: Profile Summary
    expect(screen.getByText(/PROFILE SUMMARY/i)).toBeDefined();
    expect(screen.getByText('ZAYN K.')).toBeDefined();
    expect(screen.getByText(/Account Verification/i)).toBeDefined();
    expect(screen.getByText(/zaynk@gmail.com/i)).toBeDefined();

    // Card 2: Gamification & Status
    expect(screen.getByText(/GAMIFICATION & STATUS/i)).toBeDefined();
    expect(screen.getByText(/Verified Heritage Expert/i)).toBeDefined();
    expect(screen.getByText(/Historical validations/i)).toBeDefined();
    expect(screen.getByText(/Landmark photo approvals/i)).toBeDefined();
    expect(screen.getByText(/Community awards/i)).toBeDefined();

    // Card 3A: My Contributions
    expect(screen.getByText(/MY CONTRIBUTIONS/i)).toBeDefined();
    expect(screen.getAllByText(/Approved/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Pending/i)).toBeDefined();
    expect(screen.getByText(/EDIT PROFILE/i)).toBeDefined();
    expect(screen.getByText(/LOGOUT/i)).toBeDefined();

    // Card 3B: Saved Itineraries
    expect(screen.getByText(/SAVED ITINERARIES/i)).toBeDefined();
    expect(screen.getAllByText(/7-Day Mughal Heritage Trail/i).length).toBeGreaterThan(0);

    // Card 3C: Account Settings
    expect(screen.getByText(/ACCOUNT SETTINGS/i)).toBeDefined();
    expect(screen.getByText('Notifications')).toBeDefined();
    expect(screen.getByText('Security')).toBeDefined();
    expect(screen.getByText('Payment Methods')).toBeDefined();
    expect(screen.getByText('Verified Guide Status')).toBeDefined();
  });

  it('renders SubmitSpotModal with Step 3 of 5, timeline records, and upload rows (Image 3)', () => {
    useMapStore.setState({ isSubmitSpotOpen: true });
    render(<SubmitSpotModal />);

    // Header
    expect(screen.getByText(/SUBMIT A SPOT: HISTORICAL & MULTIMEDIA DATA/i)).toBeDefined();
    expect(screen.getByText(/Step 3 of 5/i)).toBeDefined();

    // Left Column
    expect(screen.getByText(/LANDMARK TITLE/i)).toBeDefined();
    expect(screen.getByText(/HISTORICAL TIMELINE/i)).toBeDefined();
    expect(screen.getAllByText('1678').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1888').length).toBeGreaterThan(0);
    expect(screen.getByText(/FOLKLORE & LORE/i)).toBeDefined();

    // Right Column
    expect(screen.getByText(/Historical Photo Uploading.../i)).toBeDefined();
    expect(screen.getByText(/Historical Drone Uploading.../i)).toBeDefined();
    expect(screen.getByText(/PREVIOUS STEP/i)).toBeDefined();
    expect(screen.getByText(/NEXT STEP/i)).toBeDefined();
  });

  it('renders PlannerView with 7-Day Exploration, Verified Guides, Travel Times, and Cart Summary (Image 4)', () => {
    render(<PlannerView />);

    // Left Panel
    expect(screen.getByText(/BUILD ITINERARY: 7-DAY EXPLORATION/i)).toBeDefined();
    expect(screen.getByText(/Day 1: Dhaka - Ahsan Manzil & Old Dhaka/i)).toBeDefined();
    expect(screen.getByText(/Day 2: Sylhet - Tea Gardens & Hidden Falls/i)).toBeDefined();

    // Right Panel
    expect(screen.getByText(/BOOK GUIDE & LOGISTICS/i)).toBeDefined();
    expect(screen.getByText(/VERIFIED LOCAL GUIDES/i)).toBeDefined();
    expect(screen.getByText('RAHMAN A.')).toBeDefined();
    expect(screen.getByText('RAHMAN N.')).toBeDefined();
    expect(screen.getByText('MAHMUD S.')).toBeDefined();

    // Logistics & Cart
    expect(screen.getByText(/ESTIMATED TRAVEL TIMES/i)).toBeDefined();
    expect(screen.getAllByText(/ACCOMMODATION OPTIONS/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/CART SUMMARY/i)).toBeDefined();
    expect(screen.getAllByText('$340').length).toBeGreaterThan(0);
  });
});
