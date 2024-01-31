import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { pageChange, guideChange, civsSetChange } from '../../../reducers/pageReducer'
import { setCivs } from '../../../reducers/civReducer'
import { setCiv1Wins, setCiv2Wins } from "../../../reducers/statsReducer"
import { setMatchup } from "../../../reducers/matchupReducer"
import matchService from "../../../services/matches"
import CivButtonHolder from "./CivButtonHolder"
import CivsListHeader from "./CivsListHeader"
import MatchupService from "../../../services/matchup"

const CivsList = () => {
  const [chosenCivs, setChosenCivs] = useState([])
  const dispatch = useDispatch()
  const civsSet = useSelector(state => state.pageState.civsSet)

  const buttFunc = async (civ) => {
    const chosenCiv = civ.split(".")[0].toLowerCase()
    if (civsSet===0) {
      setChosenCivs([chosenCiv])
      dispatch(civsSetChange(1))
    } else if (civsSet ===1) {
      setChosenCivs([...chosenCivs, chosenCiv])
      dispatch(setCivs(chosenCivs))
      const matchParticipants = { civ1: chosenCivs[0], civ2: chosenCiv }
      // get matchup stuff like suggested units
      const matchupStuff = await MatchupService.getMatchup(matchParticipants)
      // get winpct
      dispatch(setMatchup(matchupStuff))
      const matches = await matchService.getWithCivs(
        { civ1:chosenCivs[0].toLowerCase(),
          civ2:chosenCiv.toLowerCase() })
      dispatch(setCiv1Wins(matches.civ1wins))
      dispatch(setCiv2Wins(matches.civ2wins))

      dispatch(guideChange('matchup'))
      dispatch(pageChange('guide'))
      setChosenCivs([]) // resetoi
    }
  }

  return (
    <div>
      <CivsListHeader />
      <CivButtonHolder f={buttFunc}/>
    </div>
  )
}

export default CivsList
