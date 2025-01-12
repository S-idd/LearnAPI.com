import React from 'react';
import { Award, Star } from 'lucide-react';

interface BadgesProps {
  earnedBadges: string[];
}

const allBadges = [
  {
    id: 'challenge_1',
    name: 'RestController Master',
    description: 'Mastered the @RestController annotation',
    icon: <Award className="w-8 h-8 text-yellow-500" />
  },
  {
    id: 'challenge_2',
    name: 'Mapping Pro',
    description: 'Learned how to use @RequestMapping',
    icon: <Star className="w-8 h-8 text-blue-500" />
  },
  {
    id: 'quiz_1',
    name: 'Quiz Champion I',
    description: 'Completed the first quiz challenge',
    icon: <Award className="w-8 h-8 text-purple-500" />
  },
  {
    id: 'quiz_2',
    name: 'Quiz Champion II',
    description: 'Completed the second quiz challenge',
    icon: <Star className="w-8 h-8 text-green-500" />
  }
];

function Badges({ earnedBadges }: BadgesProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-600">Your Achievement Badges</h2>
        <p className="text-gray-600 mt-2">Collect them all by completing challenges and quizzes!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allBadges.map((badge) => (
          <div
            key={badge.id}
            className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
              earnedBadges.includes(badge.id)
                ? 'bg-white'
                : 'bg-gray-100 opacity-50'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              {badge.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{badge.name}</h3>
              <p className="text-gray-600 text-sm">{badge.description}</p>
              {!earnedBadges.includes(badge.id) && (
                <div className="mt-4 text-sm text-gray-500">
                  🔒 Keep learning to unlock!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Badges;