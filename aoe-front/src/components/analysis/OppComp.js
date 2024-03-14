import React from 'react';
import OppCompDisplay from './OppCompDisplay';
import OppUnitsGrid from './OppUnitsGrid';

const OppComp = ({ oppUnits, oppComp, onUnitToggle }) => {
  return (
    <div className="compholder">
      <OppCompDisplay oppComp={oppComp} />
      <OppUnitsGrid oppComp={oppComp} oppUnits={oppUnits} onUnitToggle={onUnitToggle} />
    </div>
  );
};

export default OppComp;