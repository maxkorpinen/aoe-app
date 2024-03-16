import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OppComp from './OppComp';
import YourComp from './YourComp';
import AgeUp from './AgeUp';
import matchupService from '../../services/matchup';
import './guide.css'

const Guide = () => {
  const [yourComp, setYourComp] = useState([]);
  const [oppComp, setOppComp] = useState([]);
  const [yourAge, setYourAge] = useState('feudal');
  const [oppAge, setOppAge] = useState('feudal');

  const civs = useSelector(state => state.civs);
  const allCivs = useSelector(state => state.allCivs);

  const yourCiv = allCivs.find(civ => civ.id === civs.civ1);
  const oppCiv = allCivs.find(civ => civ.id === civs.civ2);
  console.log('OppCiv:', oppCiv)

  const oppUnits = oppCiv.units[oppAge].map(unitObj => unitObj.unit);

  // Fetch initial matchup when component mounts
  useEffect(() => {
    const fetchMatchup = async () => {
      const oppComp = await matchupService.getMatchup(oppCiv.id, oppAge);
      console.log('OppComp:', oppComp);
      setOppComp(oppComp);
    };

    fetchMatchup();
  }, []);

  // To not run the below useEffect on the first render
  const firstUpdate = useRef(true);
  // Update matchup when dependencies change
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const updateMatchup = async () => {
      if (Array.isArray(oppComp)) {
        matchupService.updateMatchup(yourCiv.id, oppCiv.id, oppComp.map(unit => unit.id), yourAge, oppAge)
          .then(response => {
            setYourComp(response.yourComp);
            console.log('YourComp:', response.yourComp);
          })
          .catch(error => {
            console.error('Error updating matchup:', error);
          });
      }
    };

    updateMatchup();
  }, [oppComp, oppAge, yourAge]);

  const handleUnitToggle = useCallback((unitId) => {
    const clickedUnit = oppUnits.find(unit => unit.id === unitId);
    setOppComp(prevOppComp => {
      // Check if the clicked unit is already in OppComp
      const isUnitInOppComp = prevOppComp.some(unit => unit.id === unitId);

      // If there's only one unit in OppComp and it's the one being toggled, don't allow it to be toggled off
      if (prevOppComp.length === 1 && isUnitInOppComp) {
        return prevOppComp;
      }

      let newOppComp;
      if (isUnitInOppComp) {
        // If the unit is already in OppComp, remove it
        newOppComp = prevOppComp.filter(unit => unit.id !== unitId);
      } else {
        // If the unit isn't in OppComp, add it
        newOppComp = [...prevOppComp, clickedUnit];
      }

      return newOppComp;
    });
  }, [oppUnits]);

  /*   useEffect(() => {
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
    }, [oppComp, yourCiv.id, oppCiv.id]); */

  return (
    <div className='content'>
      <h2>{yourCiv.name} <img className='civicon' src={yourCiv.image} /> vs <img className='civicon' src={oppCiv.image} /> {oppCiv.name}</h2>
      <div className='overcomp'>
        <AgeUp yourAge={yourAge} oppAge={oppAge} setYourAge={setYourAge} setOppAge={setOppAge} />
        <YourComp yourComp={yourComp} yourCiv={yourCiv} />
        <OppComp oppUnits={oppUnits} oppComp={oppComp} onUnitToggle={(unitId) => handleUnitToggle(unitId)} />
      </div>
    </div>
  );
};

export default Guide;