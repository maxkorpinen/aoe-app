import React from 'react';

const OppCompDisplay = ({ oppComp, oppCivWinP }) => {
  return (
    <div>
      <h3>Opponent Unit Composition</h3>
      <p>Win Percentage: {oppCivWinP}%</p>
      <div className='compbox'>
        {oppComp.map(unit => (
          <div key={unit.id} className='unitholder'>
            <img src={unit.image} alt={unit.name}/>
            <p>
              {unit.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OppCompDisplay;