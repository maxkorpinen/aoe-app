import { useSelector } from 'react-redux';
import CounterBoxesHolder from './CounterBoxesHolder'
import UnitBoxesHolder from './UnitBoxesHolder'
import './guide.css'

const Matchup = () => {
  const matchup = useSelector(state => state.matchup);
  console.log('matchup', matchup)

  return (
    <div>
      <p>matchup stuff</p>
    </div>
  )
}

export default Matchup
/*
<UnitBoxesHolder />
      <CounterBoxesHolder/>
*/