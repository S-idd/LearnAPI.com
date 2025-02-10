import React from 'react';
import { Rocket, Heart, Zap,Skull } from 'lucide-react';


function HomePage() {
  return (
    <div className="space-y-8 animate-fadeIn">
     
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Spring into Action! ♨️</h1>
        <p className="text-xl text-gray-600">Let's learn Spring Boot together in a fun way!</p>
      </div>

     
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200">
         
          <Rocket className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy to Learn</h3>
          <p className="text-gray-600">Start your journey with simple concepts and grow step by step!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200">
         
          <Heart className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fun Facts</h3>
          <p className="text-gray-600">Did you know Spring Boot was first released in 2014? Amazing!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200">
         
          <Zap className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
          <p className="text-gray-600">Learn by doing with our fun challenges and quizzes!</p>
        </div>
      </div>

      
      <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is Spring Boot? 🤔</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Think of Spring Boot as a magical helper that makes creating web applications super easy! 
          It's like having a special toolbox that has everything you need to build amazing things on the internet.
          With Spring Boot, you can focus on the fun part of coding while it takes care of the boring stuff!
        </p>
      </div>

      <div className="mt-8 text-center">
       
        <button 
          onClick={() => {
            const navElement = document.querySelector('button[data-page="learn"]');
            if (navElement) {
              (navElement as HTMLButtonElement).click();
            }
          }}
          className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Start Learning! 🚀
        </button>
      </div>
    </div>
  );
}

export default HomePage;