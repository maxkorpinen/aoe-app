import React from 'react'

const AgeUp = ({ yourAge, oppAge, setYourAge, setOppAge }) => {
  const ages = ['feudal', 'castle', 'imperial'];

  return (
    <div>
      <h2>Your Age</h2>
      {ages.map(age => (
        <button
          key={age}
          disabled={yourAge === age}
          onClick={() => setYourAge(age)}
        >
          {age}
        </button>
      ))}

      <h2>Opponents Age</h2>
      {ages.map(age => (
        <button
          key={age}
          disabled={oppAge === age}
          onClick={() => setOppAge(age)}
        >
          {age}
        </button>
      ))}
    </div>
  );
};

export default AgeUp