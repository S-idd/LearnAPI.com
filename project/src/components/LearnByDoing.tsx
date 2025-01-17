import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  code: string;
  solution: string;
  hint: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: '@RestController',
    description: 'Create a simple REST controller that returns "Hello, World!"',
    code: '@___Controller\npublic class HelloController {\n\n}',
    solution: '@RestController\npublic class HelloController {\n\n}',
    hint: 'This annotation combines @Controller and @ResponseBody'
  },
  {
    id: 2,
    title: '@RequestMapping',
    description: 'Map this method to handle GET requests at "/hello"',
    code: '@RestController\npublic class HelloController {\n    ___("/hello")\n    public String hello() {\n        return "Hello, World!";\n    }\n}',
    solution: '@RestController\npublic class HelloController {\n    @RequestMapping("/hello")\n    public String hello() {\n        return "Hello, World!";\n    }\n}',
    hint: 'Use @RequestMapping to map web requests to methods'
  },
  {
    id: 3,
    title: '@GetMapping',
    description: 'Use a more specific annotation to handle GET requests at "/welcome".',
    code: '@RestController\npublic class WelcomeController {\n    ___("/welcome")\n    public String welcome() {\n        return "Welcome!";\n    }\n}',
    solution: '@RestController\npublic class WelcomeController {\n    @GetMapping("/welcome")\n    public String welcome() {\n        return "Welcome!";\n    }\n}',
    hint: 'Use @GetMapping for GET request handling.'
  },
  {
    id: 4,
    title: '@PostMapping',
    description: 'Map a method to handle POST requests at "/submit".',
    code: '@RestController\npublic class SubmitController {\n    ___("/submit")\n    public String submit() {\n        return "Submitted!";\n    }\n}',
    solution: '@RestController\npublic class SubmitController {\n    @PostMapping("/submit")\n    public String submit() {\n        return "Submitted!";\n    }\n}',
    hint: 'Use @PostMapping for POST request handling.'
  },
  {
    id: 5,
    title: '@PathVariable',
    description: 'Extract a dynamic value from the URL path and return it.',
    code: '@RestController\npublic class GreetingController {\n    @GetMapping("/greet/{name}")\n    public String greet(___) {\n        return "Hello, " + name + "!";\n    }\n}',
    solution: '@RestController\npublic class GreetingController {\n    @GetMapping("/greet/{name}")\n    public String greet(@PathVariable String name) {\n        return "Hello, " + name + "!";\n    }\n}',
    hint: 'Use @PathVariable to bind a URL template variable to a method parameter.'
  },
  {
    id: 6,
    title: '@RequestBody',
    description: 'Create a method that accepts a JSON payload representing a User object.',
    code: '@RestController\npublic class UserController {\n    @PostMapping("/user")\n    public String createUser(___) {\n        return "User created: " + user.getName();\n    }\n}',
    solution: '@RestController\npublic class UserController {\n    @PostMapping("/user")\n    public String createUser(@RequestBody User user) {\n        return "User created: " + user.getName();\n    }\n}',
    hint: 'Use @RequestBody to bind the body of a request to a method parameter.'
  },
  {
    id: 7,
    title: '@RequestParam',
    description: 'Handle a request with query parameters.',
    code: '@RestController\npublic class SearchController {\n    @GetMapping("/search")\n    public String search(___) {\n        return "Searching for " + query;\n    }\n}',
    solution: '@RestController\npublic class SearchController {\n    @GetMapping("/search")\n    public String search(@RequestParam String query) {\n        return "Searching for " + query;\n    }\n}',
    hint: 'Use @RequestParam to extract query parameters from a request.'
  },
  {
    id: 8,
    title: '@PutMapping',
    description: 'Create a method to handle PUT requests to update user information.',
    code: '@RestController\npublic class UpdateController {\n    ___("/user")\n    public String updateUser() {\n        return "User updated!";\n    }\n}',
    solution: '@RestController\npublic class UpdateController {\n    @PutMapping("/user")\n    public String updateUser() {\n        return "User updated!";\n    }\n}',
    hint: 'Use @PutMapping to map PUT requests to a method.'
  },
  {
    id: 9,
    title: '@DeleteMapping',
    description: 'Map a method to handle DELETE requests at "/user/{id}".',
    code: '@RestController\npublic class DeleteController {\n    ___("/user/{id}")\n    public String deleteUser(___) {\n        return "User deleted with ID: " + id;\n    }\n}',
    solution: '@RestController\npublic class DeleteController {\n    @DeleteMapping("/user/{id}")\n    public String deleteUser(@PathVariable int id) {\n        return "User deleted with ID: " + id;\n    }\n}',
    hint: 'Use @DeleteMapping and @PathVariable together.'
  },
  {
    id: 10,
    title: '@ResponseStatus',
    description: 'Set a custom HTTP status for the response.',
    code: '@RestController\npublic class StatusController {\n    @DeleteMapping("/status")\n    ___(___)\n    public void setStatus() {\n    }\n}',
    solution: '@RestController\npublic class StatusController {\n    @DeleteMapping("/status")\n    @ResponseStatus(HttpStatus.NO_CONTENT)\n    public void setStatus() {\n    }\n}',
    hint: 'Use @ResponseStatus to set a custom HTTP status code.'
  },
  {
    id: 11,
    title: '@ExceptionHandler',
    description: 'Handle exceptions using a method annotated with @ExceptionHandler.',
    code: '@RestController\npublic class ErrorHandler {\n    ___(Exception.class)\n    public String handleError(Exception ex) {\n        return "Error occurred: " + ex.getMessage();\n    }\n}',
    solution: '@RestController\npublic class ErrorHandler {\n    @ExceptionHandler(Exception.class)\n    public String handleError(Exception ex) {\n        return "Error occurred: " + ex.getMessage();\n    }\n}',
    hint: 'Use @ExceptionHandler to define methods for handling exceptions.'
  },
  {
    id: 12,
    title: '@CrossOrigin',
    description: 'Allow cross-origin requests on a method.',
    code: '@RestController\npublic class CorsController {\n    ___\n    @GetMapping("/cors")\n    public String cors() {\n        return "CORS enabled!";\n    }\n}',
    solution: '@RestController\npublic class CorsController {\n    @CrossOrigin\n    @GetMapping("/cors")\n    public String cors() {\n        return "CORS enabled!";\n    }\n}',
    hint: 'Use @CrossOrigin to enable cross-origin requests.'
  },
  {
    id: 13,
    title: '@ResponseBody',
    description: 'Return the response body directly without using a view.',
    code: '___\npublic class BodyController {\n    @GetMapping("/body")\n    public String body() {\n        return "Response body content";\n    }\n}',
    solution: '@RestController\npublic class BodyController {\n    @GetMapping("/body")\n    public String body() {\n        return "Response body content";\n    }\n}',
    hint: 'Use @ResponseBody or @RestController.'
  },
  {
    id: 14,
    title: '@ControllerAdvice',
    description: 'Create a global exception handler using @ControllerAdvice.',
    code: '@___\npublic class GlobalExceptionHandler {\n    @ExceptionHandler(RuntimeException.class)\n    public String handleRuntimeError(RuntimeException ex) {\n        return "Runtime error: " + ex.getMessage();\n    }\n}',
    solution: '@ControllerAdvice\npublic class GlobalExceptionHandler {\n    @ExceptionHandler(RuntimeException.class)\n    public String handleRuntimeError(RuntimeException ex) {\n        return "Runtime error: " + ex.getMessage();\n    }\n}',
    hint: 'Use @ControllerAdvice for global exception handling.'
  },
  {
    id: 15,
    title: '@ModelAttribute',
    description: 'Bind a form input model attribute to a method parameter.',
    code: '@RestController\npublic class FormController {\n    @PostMapping("/form")\n    public String processForm(___) {\n        return "Processed form for " + user.getName();\n    }\n}',
    solution: '@RestController\npublic class FormController {\n    @PostMapping("/form")\n    public String processForm(@ModelAttribute User user) {\n        return "Processed form for " + user.getName();\n    }\n}',
    hint: 'Use @ModelAttribute to bind form data.'
  },
];

function LearnByDoing({ onComplete }: { onComplete: (badge: string) => void }) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userCode, setUserCode] = useState(challenges[0].code);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim();

  const checkSolution = () => {
    const correct = normalizeCode(userCode) === normalizeCode(challenges[currentChallenge].solution);
    setIsCorrect(correct);
    if (correct) {
      onComplete(`challenge_${currentChallenge + 1}`);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setUserCode(challenges[currentChallenge + 1].code);
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Challenge {currentChallenge + 1}: {challenges[currentChallenge].title}
        </h2>
        <p className="text-lg text-gray-600 mb-4">{challenges[currentChallenge].description}</p>
        
        <div className="mb-4">
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-48 p-4 font-mono text-sm bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={checkSolution}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Check Solution
          </button>
          <button
            onClick={() => setShowHint(true)}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Show Hint
          </button>
        </div>

        {isCorrect !== null && (
          <div className={`mt-4 p-4 rounded-lg flex items-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            {isCorrect ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-green-700">Great job! You've mastered this annotation!</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-red-700">Not quite right. Try again!</span>
              </>
            )}
          </div>
        )}

        {showHint && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800">💡 Hint: {challenges[currentChallenge].hint}</p>
          </div>
        )}

        {isCorrect && currentChallenge < challenges.length - 1 && (
          <button
            onClick={nextChallenge}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Challenge
          </button>
        )}
      </div>
    </div>
  );
}

export default LearnByDoing;
