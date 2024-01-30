import { useDispatch, useSelector } from "react-redux"
import { pageChange, guideChange, civsSetChange } from '../../../reducers/pageReducer'
import { setCiv1, setCiv2 } from '../../../reducers/civReducer'
import { setPu1, setPu2 } from "../../../reducers/powerunitReducer"
import { setCiv1Wins, setCiv2Wins } from "../../../reducers/statsReducer"
import civstuff from "../../../utils/civ_ids"
import civService from "../../../services/civs"
import matchService from "../../../services/matches"
import CivButtonHolder from "./CivButtonHolder"
import CivsListHeader from "./CivsListHeader"

const CivsList = () => {
  const dispatch = useDispatch()
  const civsSet = useSelector(state => state.pageState.civsSet)
  const civ1 = useSelector(state => state.civs['civ1'])
  const allCivs = useSelector(state => state.allCivs)
  const { ids } = civstuff
  const buttFunc = async (civ) => {
    const chosenCiv = civ.split(".")[0].toLowerCase()
    const corrId = allCivs.filter((civ) => civ.name.toLowerCase() === chosenCiv)[0].id
    console.log("CORRID",corrId[0].id)
    const civStuff = await civService.getWithId(corrId)
    //const civStuff = await civService.getWithId(ids[chosenCiv])
    console.log("civStuff: ",civStuff)
    const civpu = await civService.getCivPowerUnit(corrId)
    console.log("2", civpu)
    civpu.civ = chosenCiv

    if (civsSet===0) {
      dispatch(setPu1([civpu]))
      dispatch(setCiv1(civStuff))
      dispatch(civsSetChange(1))
    } else if (civsSet ===1) {
      dispatch(setPu2([civpu]))
      dispatch(setCiv2(civStuff))

      const matchups = await matchService.getWithCivs(
        { civ1:civ1[0].name.toLowerCase(),
          civ2:chosenCiv.toLowerCase() })
      dispatch(setCiv1Wins(matchups.civ1wins))
      dispatch(setCiv2Wins(matchups.civ2wins))

      dispatch(guideChange('matchup'))
      dispatch(pageChange('guide'))
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
