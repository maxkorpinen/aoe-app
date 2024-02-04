import React from 'react';

const OppUnitsGrid = ({ oppUnits, onUnitToggle }) => {
  return (
    <div>
      <p>Change opponent unit comp</p>
      {oppUnits.map(unit => (
        <button key={unit.unit.id} onClick={() => onUnitToggle(unit.unit.id)}>
          {unit.unit.name}
        </button>
      ))}
    </div>
  );
};

export default OppUnitsGrid;