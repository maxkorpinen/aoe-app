import React, { useState } from 'react';
import AgeUp from './AgeUp';

const YourComp = ({ yourComp, yourCivWinP }) => {
  const [yourAge, setYourAge] = useState('feudal');
  return (
    <div className="compholder">
      <h3>Your Unit Composition</h3>
      <p>Win Percentage: {yourCivWinP}%</p>
      <AgeUp yourAge={yourAge} setYourAge={setYourAge} displayYourAge={true}/>
      <div className="compbox">
        {yourComp.map(unit => (
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

export default YourComp;