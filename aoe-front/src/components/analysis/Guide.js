import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OppComp from './OppComp';
import YourComp from './YourComp';
import matchupService from '../../services/matchup';
import './guide.css'

const Guide = () => {
  const [matchup, setMatchup] = useState(null);
  const [yourComp, setYourComp] = useState([]);
  const [oppComp, setOppComp] = useState([]);

  const civs = useSelector(state => state.civs);
  const allCivs = useSelector(state => state.allCivs);
  const allUnits = useSelector(state => state.allUnits);

  const yourCiv = allCivs.find(civ => civ.id === civs.civ1);
  const oppCiv = allCivs.find(civ => civ.id === civs.civ2);

  const oppUnits = oppCiv.units.map(unitObj => unitObj.unit);

  useEffect(() => {
    const fetchMatchup = async () => {
      const initialMatchup = await matchupService.getMatchup(civs);
      setMatchup(initialMatchup);
      setYourComp(initialMatchup.yourComp);
      setOppComp(initialMatchup.oppComp);
    };

    fetchMatchup();
  }, [civs]);

  const handleUnitToggle = useCallback((unitId) => {
    const clickedUnit = oppUnits.find(unit => unit.id === unitId);
    setOppComp(prevOppComp => {
      // Check if the clicked unit is already in OppComp
      const isUnitInOppComp = prevOppComp.some(unit => unit.id === unitId);

      if (isUnitInOppComp) {
        // If the unit is already in OppComp, remove it
        return prevOppComp.filter(unit => unit.id !== unitId);
      } else {
        // If the unit isn't in OppComp, add it
        return [...prevOppComp, clickedUnit];
      }
    });

    // Move the API call inside the useEffect hook
  }, [oppUnits]); // Add oppUnits to the dependency array

  useEffect(() => {
    if (oppComp.length > 0) {
      matchupService.updateMatchup(yourCiv.id, oppCiv.id, oppComp.map(unit => unit.id))
        .then(response => {
          // Assuming you have a state update function called setYourComp
          setYourComp(response.yourComp);
        })
        .catch(error => {
          console.error('Error updating matchup:', error);
        });
    }
  }, [oppComp, yourCiv.id, oppCiv.id]);

  return (
    <div className='content'>
      <h2>{yourCiv.name} vs {oppCiv.name}</h2>
      <div className='overcomp'>
        <YourComp yourComp={yourComp} yourCiv={yourCiv} />
        <OppComp oppUnits={oppUnits} oppComp={oppComp} onUnitToggle={(unitId) => handleUnitToggle(unitId)} />
      </div>
    </div>
  );
};

export default Guide;