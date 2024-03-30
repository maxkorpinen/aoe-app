import React, { useState } from 'react';
import AgeUp from './AgeUp';

const OppCompDisplay = ({ oppComp, oppCivWinP }) => {
  const [oppAge, setOppAge] = useState('feudal');
  return (
    <div>
      <h3>Opponent Unit Composition</h3>
      <p>Win Percentage: {oppCivWinP}%</p>
      <AgeUp oppAge={oppAge} setOppAge={setOppAge} displayYourAge={false} />
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