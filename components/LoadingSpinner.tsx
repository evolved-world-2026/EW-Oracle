
import React, { useState, useEffect } from 'react';

const funFacts = [
  "A pig's orgasm can last for up to 30 minutes.",
  "The word 'avocado' is derived from an Aztec word for 'testicle'.",
  "Dolphins, like humans, have sex for pleasure, not just procreation.",
  "In ancient Greece, throwing an apple at someone was a common marriage proposal.",
  "Female kangaroos have three vaginas.",
  "The clitoris contains over 8,000 nerve endings—twice as many as the head of the penis.",
  "Barnacles have the largest penis-to-body-size ratio in the animal kingdom.",
  "Some female dragonflies fake their own death to avoid unwanted male advances.",
  "The ancient Romans used the word 'vagina' to mean 'a sheath for a sword.'",
  "A female ferret will die if she goes into heat and doesn't find a mate.",
  "Snails are hermaphrodites that stab each other with 'love darts' during courtship.",
  "The argonaut octopus has a detachable penis it can throw at females.",
  "In the 17th century, the word 'die' was a popular euphemism for having an orgasm.",
  "The male honey bee's testicles explode upon mating, a fatal event for him.",
  "Bonobos often use sex to resolve conflicts, greet each other, and exchange favors.",
  "Male porcupines perform a courtship dance before spraying urine all over the female.",
  "Semen contains zinc and calcium, both of which are known to help prevent tooth decay.",
  "Ancient Egyptians used pessaries made of crocodile dung as a form of contraception.",
  "The G-spot was almost named the 'Whipple Tickle' after the professor who studied it.",
  "Sperm whales get their name because whalers mistook the waxy substance in their heads for semen.",
  "The inventor of Corn Flakes believed that a bland diet would curb the desire to masturbate.",
  "In Victorian England, even table legs were covered with cloth to avoid being seen as sexually suggestive.",
  "The first couple shown in bed together on American primetime TV was Fred and Wilma Flintstone.",
  "The scientific term for butt crack is 'intergluteal cleft'.",
  "Orgasm releases endorphins, the body's natural painkillers, which can help relieve headaches.",
  "Some species of flatworms engage in 'penis fencing', where hermaphroditic worms fight to inseminate the other.",
  "Sea otters hold hands when they sleep so they don't float away from each other. That's just cute.",
];


const LoadingSpinner: React.FC = () => {
  const [currentFact, setCurrentFact] = useState(() => funFacts[Math.floor(Math.random() * funFacts.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prevFact => {
        let newFact = prevFact;
        // Ensure the new fact is different from the current one
        while (newFact === prevFact) {
          newFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        }
        return newFact;
      });
    }, 5000); // Change fact every 5 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-pulse-heart {
          animation: pulse 1.2s infinite ease-in-out;
        }
        @keyframes fact-fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fact-container {
            min-height: 3em; /* Reserve space for 2 lines of text */
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .fact-text {
            animation: fact-fade-in 0.5s ease-in-out;
        }
      `}</style>
      <div className="flex flex-col justify-center items-center p-8 space-y-4 w-full max-w-2xl text-center">
        <svg
          className="w-12 h-12 text-brand-primary animate-pulse-heart"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="text-dark-text-secondary">The Oracle is contemplating...</span>
        <div className="fact-container">
            <p className="text-dark-text italic fact-text" key={currentFact}>{currentFact}</p>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
