import React from 'react';

const OppCompDisplay = ({ oppComp }) => {
  return (
    <div>
      <p>Opponent Unit Composition</p>
      {oppComp.map(unit => (
        <div key={unit._id} style={{ width: '120px', height: '120px', margin: '10px 10px 70px 10px' }}>
          <img src={unit.image} alt={unit.name} style={{ width: '100%', height: '100%' }} />
          <p style={{
            textAlign: 'center',
            margin: '0',
            whiteSpace: 'normal'
          }}>
            {unit.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OppCompDisplay;