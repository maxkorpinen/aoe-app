import React from 'react';
import OppCompDisplay from './OppCompDisplay';
import OppUnitsGrid from './OppUnitsGrid';

const OppComp = ({ oppUnits, oppComp, onUnitToggle }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <OppCompDisplay oppComp={oppComp} />
      <OppUnitsGrid oppComp={oppComp} oppUnits={oppUnits} onUnitToggle={onUnitToggle} />
    </div>
  );
};

export default OppComp;