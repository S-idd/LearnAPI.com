import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import LearnByDoing, { challenges } from '../components/LearnByDoing';

// Mock the onComplete callback
const mockOnComplete = vi.fn();

describe('LearnByDoing Component', () => {
  beforeEach(() => {
    mockOnComplete.mockClear();
    render(<LearnByDoing onComplete={mockOnComplete} />);
  });

  test('renders the initial challenge correctly', () => {
    expect(screen.getByText('Challenge 1: @RestController')).toBeInTheDocument();
    expect(screen.getByText('Create a simple REST controller that returns "Hello, World!"')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('@___Controller\npublic class HelloController {\n\n}');
  });

  test('allows user to input code and check a correct solution', () => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: '@RestController\npublic class HelloController {\n\n}' },
    });
    fireEvent.click(screen.getByText('Check Solution'));
    expect(screen.getByText("Great job! You've mastered this annotation!")).toBeInTheDocument();
    expect(mockOnComplete).toHaveBeenCalledWith('challenge_1');
    expect(screen.getByText('Next Challenge')).toBeInTheDocument();
  });

  test('displays error message for an incorrect solution', () => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: '@WrongController\npublic class HelloController {\n\n}' },
    });
    fireEvent.click(screen.getByText('Check Solution'));
    expect(screen.getByText('Not quite right. Try again!')).toBeInTheDocument();
    expect(mockOnComplete).not.toHaveBeenCalled();
    expect(screen.queryByText('Next Challenge')).not.toBeInTheDocument();
  });

  test('shows hint when "Show Hint" button is clicked', () => {
    expect(screen.queryByText('💡 Hint: This annotation combines @Controller and @ResponseBody')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Show Hint'));
    expect(screen.getByText('💡 Hint: This annotation combines @Controller and @ResponseBody')).toBeInTheDocument();
  });

  test('moves to the next challenge after a correct solution', () => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: '@RestController\npublic class HelloController {\n\n}' },
    });
    fireEvent.click(screen.getByText('Check Solution'));
    fireEvent.click(screen.getByText('Next Challenge'));
    expect(screen.getByText('Challenge 2: @RequestMapping')).toBeInTheDocument();
    expect(screen.getByText('Map this method to handle GET requests at "/hello"')).toBeInTheDocument();
    expect(textarea).toHaveValue('@RestController\npublic class HelloController {\n    ___("/hello")\n    public String hello() {\n        return "Hello, World!";\n    }\n}');
    expect(screen.queryByText("Great job! You've mastered this annotation!")).not.toBeInTheDocument();
    expect(screen.queryByText('Not quite right. Try again!')).not.toBeInTheDocument();
  });

  test('does not show "Next Challenge" button on the last challenge', async () => {
    const totalChallenges = challenges.length; // 19 challenges
    for (let i = 0; i < totalChallenges - 1; i++) {
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: challenges[i].solution } });
      fireEvent.click(screen.getByText('Check Solution'));

      // Wait for the "Next Challenge" button to appear and click it (except on the last iteration)
      await waitFor(() => {
        const nextButton = screen.getByText('Next Challenge');
        expect(nextButton).toBeInTheDocument();
        fireEvent.click(nextButton);
      });
    }

    // After the loop, we should be on Challenge 19
    await waitFor(() => {
      expect(screen.getByText(/Challenge 19: @Bean/)).toBeInTheDocument();
    }, { timeout: 2000 });

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: challenges[totalChallenges - 1].solution },
    });
    fireEvent.click(screen.getByText('Check Solution'));

    await waitFor(() => {
      expect(screen.getByText("Great job! You've mastered this annotation!")).toBeInTheDocument();
      expect(screen.queryByText('Next Challenge')).not.toBeInTheDocument();
      expect(mockOnComplete).toHaveBeenLastCalledWith('challenge_19');
    });
  });
});