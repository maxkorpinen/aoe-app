import React from 'react';

const OppUnitsGrid = ({ oppUnits, onUnitToggle, oppComp }) => {
  return (
    <div>
      <p>Change opponent unit comp</p>
      {oppUnits.map(unit => (
        <div
          key={unit.id}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '5px',
            cursor: 'pointer'
          }}
          onClick={() => onUnitToggle(unit.id)}
        >
          <img
            src={unit.image}
            alt={unit.name}
            style={{
              width: '50px',
              height: '50px',
              border: oppComp.some(oppUnit => oppUnit.id === unit.id) ? '2px solid gold' : 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OppUnitsGrid;