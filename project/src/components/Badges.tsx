import React, { useState } from 'react';
import { Award, Star, Trophy } from 'lucide-react';

// Badges List
const allBadges = [
  { id: "challenge_1", name: "RestController Master", description: "Mastered the @RestController annotation", icon: <Award className="w-8 h-8 text-yellow-500" /> },
  { id: "challenge_2", name: "Mapping Pro", description: "Learned how to use @RequestMapping", icon: <Star className="w-8 h-8 text-blue-500" /> },
  { id: "quiz_1", name: "Quiz Champion I", description: "Completed the first quiz challenge", icon: <Award className="w-8 h-8 text-purple-500" /> },
  { id: "quiz_2", name: "Quiz Champion II", description: "Completed the second quiz challenge", icon: <Star className="w-8 h-8 text-green-500" /> },
  { id: "challenge_3", name: "Service Expert", description: "Mastered the @Service annotation", icon: <Trophy className="w-8 h-8 text-red-500" /> },
  { id: "challenge_4", name: "Repository Guru", description: "Mastered the @Repository annotation", icon: <Trophy className="w-8 h-8 text-orange-500" /> },
  { id: "challenge_5", name: "Component Pro", description: "Mastered the @Component annotation", icon: <Trophy className="w-8 h-8 text-pink-500" /> },
  { id: "challenge_6", name: "Bean Configurator", description: "Mastered the @Bean annotation", icon: <Trophy className="w-8 h-8 text-teal-500" /> },
];


/**
 * Badges component to display earned badges.
 *
 * @example
 * <Badges earnedBadges={['challenge_1', 'quiz_1']} />
 *
 * @param {object} props
 * @prop {string[]} earnedBadges - The list of earned badges.
 *
 * @returns {JSX.Element} The rendered Badges component.
 */
function Badges({ earnedBadges }: { earnedBadges: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {allBadges.map((badge) => {
        const isUnlocked = earnedBadges.includes(badge.id);

        return (
          <div
            key={badge.id}
            className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${isUnlocked ? 'bg-white' : 'bg-gray-100 opacity-50'}`}
          >
            <div className="flex flex-col items-center text-center">
              {badge.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{badge.name}</h3>
              <p className="text-gray-600 text-sm">{badge.description}</p>
              {!isUnlocked && <div className="mt-4 text-sm text-gray-500">🔒 Keep learning to unlock!</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Badges;