import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badges from '../components/Badges';

// Mock earned badges for testing
const earnedBadges = ['challenge_1', 'quiz_1'];

describe('Badges Component', () => {
  test('renders all badges', () => {
    render(<Badges earnedBadges={earnedBadges} />);

    // Check if all badge names are displayed
    const badgeNames = [
      'RestController Master',
      'Mapping Pro',
      'Quiz Champion I',
      'Quiz Champion II',
      'Service Expert',
      'Repository Guru',
      'Component Pro',
      'Bean Configurator'
    ];

    badgeNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('displays unlocked badges properly', () => {
    render(<Badges earnedBadges={earnedBadges} />);
    
    // Unlocked badges should be visible and not contain the locked message
    const restControllerBadge = screen.getByText('RestController Master').closest('.p-6');
    const quizChampionBadge = screen.getByText('Quiz Champion I').closest('.p-6');

    expect(restControllerBadge).toBeVisible();
    expect(restControllerBadge).not.toHaveTextContent('🔒 Keep learning to unlock!');
    expect(quizChampionBadge).toBeVisible();
    expect(quizChampionBadge).not.toHaveTextContent('🔒 Keep learning to unlock!');
  });

  test('displays locked message for unearned badges', () => {
    render(<Badges earnedBadges={earnedBadges} />);
    // Check if locked message appears for some badges
    expect(screen.getAllByText('🔒 Keep learning to unlock!').length).toBeGreaterThan(0);
  });
});