import { render, screen } from '@testing-library/react';

import HomePage from "../components/HomePage";
import { describe, it, expect } from 'vitest';

describe('HomePage Component', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    const heading = screen.getByText(/Spring into Action!/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<HomePage />);
    expect(screen.getByText(/Easy to Learn/i)).toBeInTheDocument();
    expect(screen.getByText(/Fun Facts/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Learning/i)).toBeInTheDocument();
  });

  it('renders the Start Learning button', () => {
    render(<HomePage />);
    const button = screen.getByRole('button', { name: /Start Learning!/i });
    expect(button).toBeInTheDocument();
  });
});
