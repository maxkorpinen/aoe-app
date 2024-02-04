import React from 'react';

const YourComp = ({ yourComp }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <p>Your Unit Composition</p>
      {yourComp.map(unit => (
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

export default YourComp;