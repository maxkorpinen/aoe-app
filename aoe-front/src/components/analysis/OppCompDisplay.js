import React from 'react';

const OppCompDisplay = ({ oppComp }) => {
  return (
    <div>
      <p>Opponent Unit Composition</p>
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