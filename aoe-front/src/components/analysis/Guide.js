import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OppComp from './OppComp';
import YourComp from './YourComp';
import matchupService from '../../services/matchup';

const Guide = () => {
  const dispatch = useDispatch();

  const civs = useSelector(state => state.civs);

  const allCivs = useSelector(state => state.allCivs);
  const allUnits = useSelector(state => state.allUnits);
  console.log(allUnits)

  const yourCiv = allCivs.find(civ => civ.id === civs.civ1);
  const oppCiv = allCivs.find(civ => civ.id === civs.civ2);
  console.log('yourCiv', yourCiv);
  console.log('oppCiv', oppCiv);

  const yourComp = useSelector(state => state.matchup.yourComp);
  const oppComp = useSelector(state => state.matchup.oppComp);
  console.log('yourComp', yourComp);
  console.log('oppComp', oppComp);

  const oppUnits = oppCiv.units.map(unit => {
    const fullUnit = allUnits.find(u => u.id === unit.unit);
    return { unit: fullUnit, powerModifier: unit.powerModifier };
  });

  const handleUnitToggle = async (unitId) => {
    console.log('Unit button clicked:', unitId);
  };

  return (
    <div>
      <YourComp yourComp={yourComp} />
      <OppComp oppUnits={oppUnits} oppComp={oppComp} onUnitToggle={(unitId) => handleUnitToggle(unitId)} />
    </div>
  );
};

export default Guide;