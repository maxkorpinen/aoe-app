import {useDispatch, useSelector} from "react-redux"
import { useState } from "react"
import { pageChange } from '../reducers/pageReducer'
import { setCiv1, setCiv2 } from '../reducers/civReducer'
import { setPu1, setPu2 } from "../reducers/powerunitReducer"
import {setCiv1Wins, setCiv2Wins} from "../reducers/statsReducer"
import civstuff from "../utils/civ_ids"
import civService from "../services/civs"
import matchService from "../services/matches"
import CivButtonHolder from "./CivButtonHolder"
import CivsListHeader from "./CivsListHeader"

const CivsList = ({setGuideType}) => {
  const dispatch = useDispatch()
  const [civsSet, setCivsSet] = useState(0)
  const civ1 = useSelector(state => state.civs['civ1'])
  const {ids} = civstuff

  const buttFunc = async (civ) => {
    const chosenCiv = civ.split(".")[0].toLowerCase()
    const civpu = await civService.getCivPowerUnit(ids[chosenCiv])
    const civStuff = await civService.getWithId(ids[chosenCiv])
    civpu.civ = chosenCiv

    if (civsSet===0) {
      dispatch(setPu1([civpu]))
      dispatch(setCiv1(civStuff))
      setCivsSet(1)
    } else if (civsSet ===1) {
      dispatch(setPu2([civpu]))
      dispatch(setCiv2(civStuff))

      const matchups = await matchService.getWithCivs(
        {civ1:civ1[0].name.toLowerCase(), 
          civ2:chosenCiv.toLowerCase()})
      dispatch(setCiv1Wins(matchups.civ1wins))
      dispatch(setCiv2Wins(matchups.civ2wins))

      setGuideType('matchup')
      dispatch(pageChange('guide'))
      setCivsSet(2)
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
