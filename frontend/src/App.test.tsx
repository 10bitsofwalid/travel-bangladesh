import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('ExploreBD Frontend Smoke Test', () => {
  it('renders ExploreBD header and brand logo', () => {
    render(<App />);
    expect(screen.getByText(/Explore/i)).toBeDefined();
    expect(screen.getByText(/BD/i)).toBeDefined();
  });

  it('renders Nature & Wild and History & Heritage filter buttons', () => {
    render(<App />);
    expect(screen.getByText(/Nature & Wild/i)).toBeDefined();
    expect(screen.getByText(/History & Heritage/i)).toBeDefined();
  });
});
