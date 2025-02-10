import { render, screen } from '@testing-library/react';
import Quiz from '../components/Quiz';
import { describe, it, expect } from 'vitest';

describe('Quiz Component', () => {
  it('renders the quiz title', () => {
    render(<Quiz onComplete={(badge: string) => {}} />);
    expect(screen.getByText(/Quiz/i)).toBeInTheDocument();
  });
});
