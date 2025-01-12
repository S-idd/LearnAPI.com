import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does @RestController do?",
    options: [
      "Creates a database connection",
      "Combines @Controller and @ResponseBody",
      "Handles file uploads",
      "Creates REST API documentation"
    ],
    correctAnswer: 1,
    explanation: "@RestController is a convenience annotation that combines @Controller and @ResponseBody!"
  },
  {
    id: 2,
    question: "Which annotation is used for dependency injection in Spring Boot?",
    options: [
      "@Inject",
      "@Import",
      "@Autowired",
      "@Dependency"
    ],
    correctAnswer: 2,
    explanation: "@Autowired is used for automatic dependency injection in Spring Boot!"
  }
];

function Quiz({ onComplete }: { onComplete: (badge: string) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
      onComplete(`quiz_${currentQuestion + 1}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const isQuizComplete = currentQuestion === questions.length - 1 && showExplanation;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">Spring Boot Quiz</h2>
          <span className="text-lg font-semibold text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-lg mb-4 ${
            selectedAnswer === questions[currentQuestion].correctAnswer
              ? 'bg-green-100'
              : 'bg-red-100'
          }`}>
            <div className="flex items-center mb-2">
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className={`font-semibold ${
                selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'Correct!'
                  : 'Not quite right!'}
              </span>
            </div>
            <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {showExplanation && !isQuizComplete && (
          <button
            onClick={nextQuestion}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Question
          </button>
        )}

        {isQuizComplete && (
          <div className="text-center p-6 bg-purple-100 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">Quiz Complete!</h3>
            <p className="text-lg text-purple-700">
              You scored {score} out of {questions.length}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;