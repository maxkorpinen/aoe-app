import React from 'react';

const OppCompDisplay = ({ oppComp }) => {
  return (
    <div>
      <p>Opponent Unit Composition</p>
      {oppComp.map(unit => (
        <div
          key={unit._id}
          style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'black',
            width: '100px',
            height: '100px'
          }}
        >
          {unit.name}
        </div>
      ))}
    </div>
  );
};

export default OppCompDisplay;