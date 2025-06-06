import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BackgroundIcon from '../components/BackgroundIcon';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#1DCD9F] dark:bg-gray-50 dark:text-[#3a975b]  transition-colors duration-300 overflow-hidden">
      <BackgroundIcon/>
      {/* Navbar */}
      <Header/>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-4 py-20">
        <h2 className="text-5xl font-extrabold mb-4">Guess the Word!</h2>
        <p className="text-xl mb-8">Challenge yourself with our Wordle clone.</p>
        <Link to="/gamepage" className="dark:bg-[#3a975b] bg-[#1DCD9F]  text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#169976] transition">
          <FaPlay /> Play Now
        </Link>
      </section>

      {/* Rules */}
      <section className="px-4 py-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">Game Rules</h3>
        <ul className="max-w-2xl mx-auto list-disc list-inside space-y-2">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
          <li>You have 6 attempts to guess the correct word.</li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
