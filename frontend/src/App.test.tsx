import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('ExploreBD Frontend Component & Design Test', () => {
  it('renders ExploreBD header and brand logo', () => {
    render(<App />);
    expect(screen.getAllByText(/Explore/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/BD/i).length).toBeGreaterThan(0);
  });

  it('renders TAKE ME SOMEWHERE button and SUBMIT A SPOT button', () => {
    render(<App />);
    expect(screen.getByText(/TAKE ME SOMEWHERE/i)).toBeDefined();
    expect(screen.getByText(/SUBMIT A SPOT/i)).toBeDefined();
  });

  it('renders Filter Layers and Thematic Trails matching Image 2', () => {
    render(<App />);
    expect(screen.getByText(/FILTER LAYERS/i)).toBeDefined();
    expect(screen.getByText('NATURE')).toBeDefined();
    expect(screen.getByText('HISTORY')).toBeDefined();
    expect(screen.getByText('CULTURE')).toBeDefined();
    expect(screen.getByText('UNESCO SITES')).toBeDefined();
    expect(screen.getByText(/THEMATIC TRAILS/i)).toBeDefined();
    expect(screen.getByText(/MUGHAL HERITAGE TRAIL/i)).toBeDefined();
  });

  it('renders Ahsan Manzil destination drawer with chronicles and action buttons', () => {
    render(<App />);
    expect(screen.getAllByText(/AHSAN MANZIL/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/HISTORICAL CHRONICLES/i)).toBeDefined();
    expect(screen.getByText(/360° Virtual Tour/i)).toBeDefined();
    expect(screen.getByText(/ADD TO ITINERARY/i)).toBeDefined();
    expect(screen.getByText(/BOOK GUIDE/i)).toBeDefined();
  });
});
