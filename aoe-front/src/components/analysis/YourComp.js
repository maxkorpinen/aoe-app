import React from 'react';

const YourComp = ({ yourComp }) => {
  return (
    <div className="compholder">
      <p>Your Unit Composition</p>
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