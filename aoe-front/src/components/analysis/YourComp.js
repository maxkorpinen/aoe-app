import React from 'react';

const YourComp = ({ yourComp, yourCivWinP }) => {
  return (
    <div className="compholder">
      <h3>Your Unit Composition</h3>
      <p>Win Percentage: {yourCivWinP}%</p>
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