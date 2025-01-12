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
  }
];

function LearnByDoing({ onComplete }: { onComplete: (badge: string) => void }) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userCode, setUserCode] = useState(challenges[0].code);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkSolution = () => {
    const correct = userCode.trim() === challenges[currentChallenge].solution.trim();
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