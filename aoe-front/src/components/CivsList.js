import {useDispatch, useSelector} from "react-redux"
import { pageChange } from '../reducers/pageReducer'
import { setCiv1, setCiv2 } from '../reducers/civReducer'
import { setPu1, setPu2 } from "../reducers/powerunitReducer"
import {setCiv1Wins, setCiv2Wins} from "../reducers/statsReducer"
import images from "../utils/imageloader"
import civstuff from "../utils/civ_ids"
import civService from "../services/civs"
import matchService from "../services/matches"
import CivButton from "./CivButton"


//tätä vois palotella jotenkin
const CivsList = ({setGuideType}) => {
  const dispatch = useDispatch()
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const pu1 = useSelector(state => state.powerunits['pu1'])
  const pu2 = useSelector(state => state.powerunits['pu2'])
  const {ids} = civstuff
  const imageNames = Object.keys(images.civImages)

  const buttFunc = (civ) => {
    const chosenCiv = civ.split(".")[0].toLowerCase()
    civService.getCivPowerUnit(ids[chosenCiv]).then(civ => {
      if (isEmpty(pu1[0])){
        civ.civ = chosenCiv
        dispatch(setPu1([civ]))
        return
      }
      if (isEmpty(pu2[0])) {
        civ.civ = chosenCiv
        dispatch(setPu2([civ]))
      }
    })

    if(!isEmpty(civ1[0])) {
      matchService.getWithCivs(
        {civ1:civ1[0].name.toLowerCase(), 
          civ2:chosenCiv.toLowerCase()}).then(res => {
        console.log(res)
        dispatch(setCiv1Wins(res.civ1wins))
        dispatch(setCiv2Wins(res.civ2wins))
      })
    } 
    civService.getWithId(ids[chosenCiv]).then(civ => {
      if (isEmpty(civ1[0])){
        dispatch(setCiv1(civ))
        return
      }
      if (isEmpty(civ2[0])){
        dispatch(setCiv2(civ))
      }
      //console.log(civ1[0].name, civ[0].name)
      
      setGuideType('matchup')
      dispatch(pageChange('guide')) 
    })
      //matchService.getWithCivs(civ1[0].name, civ[0].name)
  } 

  const isEmpty = (object) => {
    if ( object == null) {
      return true
    }
    return Object.keys(object).length===0
  }

  return (
    <div>
      {isEmpty(civ1[0]) &&
      <p>Choose your civ </p>
      }
      {!isEmpty(civ1) &&
      <p>Your civ: {civ1[0].name}. Choose opponents civ!</p>
      }
      <div>
        {imageNames.map((n) => (
          <CivButton
            key={n}
            name={n}
            image={images.civImages[n]}
            buttFunc={buttFunc}
          />
        ))}
      </div>

    </div>
  )
}

export default CivsList