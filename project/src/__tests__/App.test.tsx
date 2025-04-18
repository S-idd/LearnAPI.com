import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

// Mock components with correct function signatures
vi.mock('../components/HomePage', () => ({
  default: () => <div data-testid="home-page">Mock HomePage</div>,
}));

vi.mock('../components/LearnByDoing', () => ({
/**
 * Mock LearnByDoing component for testing.
 *
 * Props:
 * - onComplete: (badge: string) => void
 *   A callback function that's invoked when the component is clicked, simulating
 *   the completion of a learning challenge and awarding a 'learnBadge'.
 *
 * @returns {JSX.Element} The mocked LearnByDoing component.
 */

  /**
   * Mock LearnByDoing component for testing.
   *
   * Props:
   * - onComplete: (badge: string) => void
   *   A callback function that's invoked when the component is clicked, simulating
   *   the completion of a learning challenge and awarding a 'learnBadge'.
   *
   * @returns {JSX.Element} The mocked LearnByDoing component.
   */
  default: ({ onComplete }: { onComplete: (badge: string) => void }) => (
    <div data-testid="learn-by-doing" onClick={() => onComplete && onComplete('learnBadge')}>
      Mock LearnByDoing
    </div>
  ),
}));

vi.mock('../components/Quiz', () => ({
/**
 * Mock Quiz component for testing.
 *
 * Props:
 * - onComplete: (badge: string) => void
 *   A callback function that's invoked when the component is clicked, simulating
 *   the completion of a quiz and awarding a 'quizBadge'.
 *
 * @returns {JSX.Element} The mocked Quiz component.
 */

/**
 * Mock Quiz component for testing.
 *
 * Props:
 * - onComplete: (badge: string) => void
 *   A callback function that's invoked when the component is clicked, simulating
 *   the completion of a quiz and awarding a 'quizBadge'.
 *
 * @returns {JSX.Element} The mocked Quiz component.
 */

  /**
   * Mock Quiz component for testing.
   *
   * Props:
   * - onComplete: (badge: string) => void
   *   A callback function that's invoked when the component is clicked, simulating
   *   the completion of a quiz and awarding a 'quizBadge'.
   *
   * @returns {JSX.Element} The mocked Quiz component.
   */
  default: ({ onComplete }: { onComplete: (badge: string) => void }) => (
    <div data-testid="quiz" onClick={() => onComplete && onComplete('quizBadge')}>
      Mock Quiz
    </div>
  ),
}));

vi.mock('../components/Badges', () => ({
/**
 * Mock Badges component for testing.
 *
 * Props:
 * - earnedBadges: string[]
 *   An array of strings representing the earned badges, which are displayed in the mocked component.
 *
 * @returns {JSX.Element} The mocked Badges component displaying the earned badges.
 */

  /**
   * Mock Badges component for testing.
   *
   * Props:
   * - earnedBadges: string[]
   *   An array of strings representing the earned badges, which are displayed in the mocked component.
   *
   * @returns {JSX.Element} The mocked Badges component displaying the earned badges.
   */
  default: ({ earnedBadges }: { earnedBadges: string[] }) => (
    <div data-testid="badges">Mock Badges: {earnedBadges.join(', ')}</div>
  ),
}));

vi.mock('../components/Glossary', () => ({
  default: () => <div data-testid="glossary">Mock Glossary</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('renders the HomePage by default', () => {
    render(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('navigates to the LearnByDoing page', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    expect(screen.getByTestId('learn-by-doing')).toBeInTheDocument();
  });

  it('navigates to the Quiz page', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /quiz/i }));
    expect(screen.getByTestId('quiz')).toBeInTheDocument();
  });

  it('navigates to the Badges page', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /badges/i }));
    expect(screen.getByTestId('badges')).toBeInTheDocument();
  });

  it('navigates to the Glossary page', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /glossary/i }));
    expect(screen.getByTestId('glossary')).toBeInTheDocument();
  });

  it('adds a badge when LearnByDoing is completed', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    fireEvent.click(screen.getByTestId('learn-by-doing'));
    fireEvent.click(screen.getByRole('button', { name: /badges/i }));
    expect(screen.getByText('Mock Badges: learnBadge')).toBeInTheDocument();
  });

  it('adds a badge when Quiz is completed', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /quiz/i }));
    fireEvent.click(screen.getByTestId('quiz'));
    fireEvent.click(screen.getByRole('button', { name: /badges/i }));
    expect(screen.getByText('Mock Badges: quizBadge')).toBeInTheDocument();
  });

  it('does not add duplicate badges', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    fireEvent.click(screen.getByTestId('learn-by-doing'));
    fireEvent.click(screen.getByTestId('learn-by-doing'));
    fireEvent.click(screen.getByRole('button', { name: /badges/i }));
    expect(screen.getByText('Mock Badges: learnBadge')).toBeInTheDocument();
    expect(screen.queryByText('Mock Badges: learnBadge, learnBadge')).not.toBeInTheDocument();
  });

  it('returns to homepage when home button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    expect(screen.getByTestId('learn-by-doing')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /home/i }));
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
