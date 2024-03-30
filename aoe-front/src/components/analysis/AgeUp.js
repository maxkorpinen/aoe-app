import React from 'react'

const AgeUp = ({ yourAge, oppAge, setYourAge, setOppAge, displayYourAge }) => {
  const ages = ['feudal', 'castle', 'imperial'];

  return (
    <div>
      {displayYourAge && (
        <div>
          <h3>Your Age</h3>
          {ages.map(age => {
            const imagePath = `/images/ages/${age}.webp`;

            return (
              <button
                key={age}
                disabled={yourAge === age}
                onClick={() => setYourAge(age)}
              >
                <img src={imagePath} alt={age} />
              </button>
            );
          })}
        </div>
      )}

      {!displayYourAge && (
        <div>
          <h3>Opponents Age</h3>
          {ages.map(age => {
            const imagePath = `/images/ages/${age}.webp`;

            return (
              <button
                key={age}
                disabled={oppAge === age}
                onClick={() => setOppAge(age)}
              >
                <img src={imagePath} alt={age} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgeUp