import React from 'react';

const YourComp = ({ yourComp }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <p>Your Unit Composition</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {yourComp.map(unit => (
          <div key={unit.id} style={{ width: '120px', height: '120px', margin: '10px 10px 50px 10px' }}>
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
    </div>
  );
};

export default YourComp;