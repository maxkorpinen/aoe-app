import React from 'react';
import OppCompDisplay from './OppCompDisplay';
import OppUnitsGrid from './OppUnitsGrid';

const OppComp = ({ oppUnits, oppComp, onUnitToggle, oppCivWinP }) => {
  return (
    <div className="compholder">
      <OppCompDisplay oppComp={oppComp} oppCivWinP={oppCivWinP} />
      <OppUnitsGrid oppComp={oppComp} oppUnits={oppUnits} onUnitToggle={onUnitToggle} />
    </div>
  );
};

export default OppComp;