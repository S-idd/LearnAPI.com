import React, { useState } from 'react';
import { Book, Award, PlayCircle, List, Home, Brain } from 'lucide-react';
import HomePage from './components/HomePage';
import LearnByDoing from './components/LearnByDoing';
import Quiz from './components/Quiz';
import Badges from './components/Badges';
import Glossary from './components/Glossary';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const addBadge = (badge: string) => {
    if (!earnedBadges.includes(badge)) {
      setEarnedBadges([...earnedBadges, badge]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 overflow-x-hidden">
      <nav className="bg-white shadow-lg overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-nowrap justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentPage('home')}
                data-page="home"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${currentPage === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}>
                <Home className="w-5 h-5 mr-2" />
                Home
              </button>
              <button
                onClick={() => setCurrentPage('learn')}
                data-page="learn"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${currentPage === 'learn' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-green-50'}`}>
                <PlayCircle className="w-5 h-5 mr-2" />
                Learn
              </button>
              <button
                onClick={() => setCurrentPage('quiz')}
                data-page="quiz"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${currentPage === 'quiz' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-600 hover:bg-yellow-50'}`}>
                <Brain className="w-5 h-5 mr-2" />
                Quiz
              </button>
              <button
                onClick={() => setCurrentPage('badges')}
                data-page="badges"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${currentPage === 'badges' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-purple-50'}`}>
                <Award className="w-5 h-5 mr-2" />
                Badges
              </button>
              <button
                onClick={() => setCurrentPage('glossary')}
                data-page="glossary"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${currentPage === 'glossary' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-pink-50'}`}>
                <Book className="w-5 h-5 mr-2" />
                Glossary
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 overflow-y-auto">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'learn' && <LearnByDoing onComplete={addBadge} />}
        {currentPage === 'quiz' && <Quiz onComplete={addBadge} />}
        {currentPage === 'badges' && <Badges earnedBadges={earnedBadges} />}
        {currentPage === 'glossary' && <Glossary />}
      </main>
    </div>
  );
}

export default App;
