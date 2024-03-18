import React from 'react';

const OppUnitsGrid = ({ oppUnits, onUnitToggle, oppComp }) => {
  return (
    <div>
      <p>Change opponent unit comp</p>
      {oppUnits.map(unit => (
        <div
          key={unit.id}
          className='unitgrid'
          onClick={() => onUnitToggle(unit.id)}
        >
          {oppComp.some(oppUnit => oppUnit.id === unit.id) ? <img src={unit.image} alt={unit.name} className='selectunit' /> : <img src={unit.image} alt={unit.name}className='nounit' /> }
        </div>
      ))}
    </div>
  );
};

export default OppUnitsGrid;