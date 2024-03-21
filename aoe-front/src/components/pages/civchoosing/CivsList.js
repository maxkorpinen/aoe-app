import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { pageChange, guideChange, civsSetChange } from '../../../reducers/pageReducer'
import { setCivs } from '../../../reducers/civReducer'
import { setCiv1Wins, setCiv2Wins } from "../../../reducers/statsReducer"
import CivButtonHolder from "./CivButtonHolder"
import CivsListHeader from "./CivsListHeader"
import civService from "../../../services/civs"

const CivsList = () => {
  const [chosenCivs, setChosenCivs] = useState([])
  const dispatch = useDispatch()
  const civsSet = useSelector(state => state.pageState.civsSet)

  const buttFunc = async (civ) => {
    const chosenCiv = civ
    if (civsSet === 0) {
      setChosenCivs([chosenCiv])
      dispatch(civsSetChange(1))
      dispatch(setCivs([chosenCiv])) // Dispatching the first civ to the state
    } else if (civsSet === 1) {
      setChosenCivs([...chosenCivs, chosenCiv])
      dispatch(setCivs([...chosenCivs, chosenCiv])) // Dispatching both civs to the state
      const matchParticipants = { civ1: chosenCivs[0], civ2: chosenCiv }

      // get matchup stuff like suggested units
      //const matchupStuff = await MatchupService.getMatchup(matchParticipants)

      // get winpct
      //dispatch(setMatchup(matchupStuff))
      const matches = await civService.getCivWinPct(
        matchParticipants)

      dispatch(setCiv1Wins(matches.civ1wins))
      dispatch(setCiv2Wins(matches.civ2wins))

      dispatch(guideChange('matchup'))
      dispatch(pageChange('guide'))
      setChosenCivs([]) // resetoi
    }

  }

  return (
    <div className="civlist">
      <CivsListHeader />
      <CivButtonHolder f={buttFunc} />
    </div>
  )
}

export default CivsList
