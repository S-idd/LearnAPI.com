import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Annotation {
  name: string;
  description: string;
  example: string;
  category: string;
}

const annotations: Annotation[] = [
  // Web Annotations
  {
    name: '@RestController',
    description: 'Marks a class as a REST controller, combining @Controller and @ResponseBody.',
    example: '@RestController\npublic class HelloController {\n    @GetMapping("/hello")\n    public String hello() {\n        return "Hello, World!";\n    }\n}',
    category: 'Web'
  },
  {
    name: '@RequestMapping',
    description: 'Maps web requests to handler methods in controller classes.',
    example: '@RequestMapping("/api")\npublic class ApiController {\n    @RequestMapping("/hello")\n    public String hello() {\n        return "Hello!";\n    }\n}',
    category: 'Web'
  },
  {
    name: '@GetMapping',
    description: 'Shortcut for @RequestMapping(method = RequestMethod.GET).',
    example: '@GetMapping("/users/{id}")\npublic User getUser(@PathVariable Long id) {\n    return userService.findById(id);\n}',
    category: 'Web'
  },
  {
    name: '@PostMapping',
    description: 'Shortcut for @RequestMapping(method = RequestMethod.POST).',
    example: '@PostMapping("/users")\npublic User createUser(@RequestBody User user) {\n    return userService.save(user);\n}',
    category: 'Web'
  },
  {
    name: '@PathVariable',
    description: 'Extracts values from the URL path.',
    example: '@GetMapping("/users/{id}")\npublic User getUser(@PathVariable("id") Long userId) {\n    return userService.findById(userId);\n}',
    category: 'Web'
  },
  {
    name: '@RequestBody',
    description: 'Binds HTTP request body to a method parameter.',
    example: '@PostMapping("/users")\npublic User createUser(@RequestBody User user) {\n    return userService.createUser(user);\n}',
    category: 'Web'
  },
  {
    name: '@RequestParam',
    description: 'Extracts query parameters from the URL.',
    example: '@GetMapping("/search")\npublic List<User> searchUsers(@RequestParam String name) {\n    return userService.searchByName(name);\n}',
    category: 'Web'
  },
  {
    name: '@ResponseStatus',
    description: 'Marks a method or exception class with the status code to return.',
    example: '@ResponseStatus(HttpStatus.CREATED)\n@PostMapping("/users")\npublic User createUser(@RequestBody User user) {\n    return userService.save(user);\n}',
    category: 'Web'
  },
  {
    name: '@CrossOrigin',
    description: 'Enables cross-origin resource sharing (CORS).',
    example: '@CrossOrigin(origins = "http://localhost:3000")\n@RestController\npublic class UserController {\n    // Controller methods\n}',
    category: 'Web'
  },
  {
    name: '@ExceptionHandler',
    description: 'Handles exceptions thrown from controller methods.',
    example: '@ExceptionHandler(UserNotFoundException.class)\npublic ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {\n    return ResponseEntity.notFound().build();\n}',
    category: 'Web'
  },
  // Core Annotations
  {
    name: '@Autowired',
    description: 'Automatically injects dependencies into Spring beans.',
    example: '@Service\npublic class UserService {\n    @Autowired\n    private UserRepository userRepository;\n}',
    category: 'Core'
  },
  {
    name: '@Component',
    description: 'Marks a class as a Spring component for auto-detection.',
    example: '@Component\npublic class EmailService {\n    public void sendEmail(String to, String subject) {\n        // Email sending logic\n    }\n}',
    category: 'Core'
  },
  {
    name: '@Service',
    description: 'Indicates that a class is a service layer component.',
    example: '@Service\npublic class UserService {\n    public User findById(Long id) {\n        // Service logic\n    }\n}',
    category: 'Core'
  },
  {
    name: '@Repository',
    description: 'Marks a class as a Data Access Object.',
    example: '@Repository\npublic interface UserRepository extends JpaRepository<User, Long> {\n    User findByEmail(String email);\n}',
    category: 'Core'
  },
  {
    name: '@Configuration',
    description: 'Indicates that a class declares one or more @Bean methods.',
    example: '@Configuration\npublic class AppConfig {\n    @Bean\n    public DataSource dataSource() {\n        return new DataSource();\n    }\n}',
    category: 'Core'
  },
  {
    name: '@Value',
    description: 'Injects values from properties files into fields.',
    example: '@Component\npublic class MailConfig {\n    @Value("${mail.host}")\n    private String mailHost;\n}',
    category: 'Core'
  },
  {
    name: '@Scope',
    description: 'Defines the scope of a bean (singleton, prototype, etc.).',
    example: '@Scope("prototype")\n@Component\npublic class PrototypeBean {\n    // Bean definition\n}',
    category: 'Core'
  },
  {
    name: '@Qualifier',
    description: 'Specifies which bean should be autowired when multiple options exist.',
    example: '@Autowired\n@Qualifier("primaryDataSource")\nprivate DataSource dataSource;',
    category: 'Core'
  },
  {
    name: '@Primary',
    description: 'Indicates that a bean should be given preference when multiple candidates are qualified.',
    example: '@Primary\n@Bean\npublic DataSource primaryDataSource() {\n    return new DataSource();\n}',
    category: 'Core'
  },
  {
    name: '@Profile',
    description: 'Configures beans for specific deployment environments.',
    example: '@Profile("development")\n@Configuration\npublic class DevConfig {\n    // Development-specific beans\n}',
    category: 'Core'
  }
];

/**
 * Glossary component to display Spring Boot annotations.
 *
 * The component allows the user to search for annotations by name or description,
 * and filter the results by category.
 *
 * @example
 * <Glossary />
 *
 * @returns {JSX.Element} The rendered Glossary component.
 */
function Glossary(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  /**
   * Returns a filtered list of annotations based on the search term and category.
   */
  const filteredAnnotations = annotations.filter(annotation => {
    const matchesSearch = annotation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      annotation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || annotation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Returns a list of categories for the annotations.
   */
  const categories = ['all', ...new Set(annotations.map(a => a.category))];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Spring Boot Annotations Glossary</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search annotations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize ${selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredAnnotations.map((annotation, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{annotation.name}</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 mt-2">
                    {annotation.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{annotation.description}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-java">{annotation.example}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Glossary;