import React from 'react';

const OppUnitsGrid = ({ oppUnits, onUnitToggle }) => {
  return (
    <div>
      <p>Change opponent unit comp</p>
      {oppUnits.map(unit => (
        <div
          key={unit.unit.id}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '5px',
            cursor: 'pointer'
          }}
          onClick={() => onUnitToggle(unit.unit.id)}
        >
          <img
            src={unit.unit.image}
            alt={unit.unit.name}
            style={{ width: '50px', height: '50px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default OppUnitsGrid;