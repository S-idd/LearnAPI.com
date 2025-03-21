import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Glossary from '../components/Glossary';

describe('Glossary Component', () => {
  beforeEach(() => {
    render(<Glossary />);
  });

  test('renders all annotations initially', () => {
    expect(screen.getByText('Spring Boot Annotations Glossary')).toBeInTheDocument();
    expect(screen.getByText('@RestController')).toBeInTheDocument();
    expect(screen.getByText('@RequestMapping')).toBeInTheDocument();
    expect(screen.getByText('@GetMapping')).toBeInTheDocument();
    expect(screen.getByText('@PostMapping')).toBeInTheDocument();
    expect(screen.getByText('@PathVariable')).toBeInTheDocument();
    expect(screen.getByText('@RequestBody')).toBeInTheDocument();
    expect(screen.getByText('@RequestParam')).toBeInTheDocument();
    expect(screen.getByText('@ResponseStatus')).toBeInTheDocument();
    expect(screen.getByText('@CrossOrigin')).toBeInTheDocument();
    expect(screen.getByText('@ExceptionHandler')).toBeInTheDocument();
    expect(screen.getByText('@Autowired')).toBeInTheDocument();
    expect(screen.getByText('@Component')).toBeInTheDocument();
    expect(screen.getByText('@Service')).toBeInTheDocument();
    expect(screen.getByText('@Repository')).toBeInTheDocument();
    expect(screen.getByText('@Configuration')).toBeInTheDocument();
    expect(screen.getByText('@Value')).toBeInTheDocument();
    expect(screen.getByText('@Scope')).toBeInTheDocument();
    expect(screen.getByText('@Qualifier')).toBeInTheDocument();
    expect(screen.getByText('@Primary')).toBeInTheDocument();
    expect(screen.getByText('@Profile')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Web' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Core' })).toBeInTheDocument();
  });

  test('filters annotations based on search term', () => {
    const searchInput = screen.getByPlaceholderText('Search annotations...');

    fireEvent.change(searchInput, { target: { value: '@GetMapping' } });
    expect(screen.getByText('@GetMapping')).toBeInTheDocument();
    expect(screen.queryByText('@RestController')).not.toBeInTheDocument();
    expect(screen.queryByText('@RequestMapping')).not.toBeInTheDocument();
    expect(screen.queryByText('@Autowired')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'inject' } });
    expect(screen.getByText('@Autowired')).toBeInTheDocument();
    expect(screen.getByText('@Value')).toBeInTheDocument();
    expect(screen.queryByText('@GetMapping')).not.toBeInTheDocument();
    expect(screen.queryByText('@RestController')).not.toBeInTheDocument();
  });

  test('filters annotations by category', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Web' }));

    expect(screen.getByText('@RestController')).toBeInTheDocument();
    expect(screen.getByText('@RequestMapping')).toBeInTheDocument();
    expect(screen.getByText('@GetMapping')).toBeInTheDocument();
    expect(screen.getByText('@PostMapping')).toBeInTheDocument();
    expect(screen.getByText('@PathVariable')).toBeInTheDocument();
    expect(screen.getByText('@RequestBody')).toBeInTheDocument();
    expect(screen.getByText('@RequestParam')).toBeInTheDocument();
    expect(screen.getByText('@ResponseStatus')).toBeInTheDocument();
    expect(screen.getByText('@CrossOrigin')).toBeInTheDocument();
    expect(screen.getByText('@ExceptionHandler')).toBeInTheDocument();

    expect(screen.queryByText('@Autowired')).not.toBeInTheDocument();
    expect(screen.queryByText('@Component')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Core' }));

    expect(screen.getByText('@Autowired')).toBeInTheDocument();
    expect(screen.getByText('@Component')).toBeInTheDocument();
    expect(screen.getByText('@Service')).toBeInTheDocument();
    expect(screen.getByText('@Repository')).toBeInTheDocument();
    expect(screen.getByText('@Configuration')).toBeInTheDocument();
    expect(screen.getByText('@Value')).toBeInTheDocument();
    expect(screen.getByText('@Scope')).toBeInTheDocument();
    expect(screen.getByText('@Qualifier')).toBeInTheDocument();
    expect(screen.getByText('@Primary')).toBeInTheDocument();
    expect(screen.getByText('@Profile')).toBeInTheDocument();

    expect(screen.queryByText('@RestController')).not.toBeInTheDocument();
    expect(screen.queryByText('@GetMapping')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'all' }));
    expect(screen.getByText('@RestController')).toBeInTheDocument();
    expect(screen.getByText('@Autowired')).toBeInTheDocument();
  });

  test('displays annotation details correctly', () => {
    // Check details for '@RestController'
    const restControllerCard = screen.getByText('@RestController').closest('.border')!;
    expect(restControllerCard).toHaveTextContent('Marks a class as a REST controller, combining @Controller and @ResponseBody.');
    expect(restControllerCard).toHaveTextContent('Web');
    const restControllerPre = restControllerCard.querySelector('pre');
    expect(restControllerPre).toHaveTextContent('@RestController public class HelloController { @GetMapping("/hello") public String hello() { return "Hello, World!"; } }');

    // Check details for '@Autowired'
    const autowiredCard = screen.getByText('@Autowired').closest('.border')!;
    expect(autowiredCard).toHaveTextContent('Automatically injects dependencies into Spring beans.');
    expect(autowiredCard).toHaveTextContent('Core');
    const autowiredPre = autowiredCard.querySelector('pre');
    expect(autowiredPre).toHaveTextContent('@Service public class UserService { @Autowired private UserRepository userRepository; }');
  });
});