import {useDispatch, useSelector} from "react-redux"
import { pageChange } from '../reducers/pageReducer'
import { setCiv1, setCiv2 } from '../reducers/civReducer'
import images from "../utils/imageloader"
import civstuff from "../utils/civ_ids"
import civService from "../services/civs"
import CivButton from "./CivButton"


const CivsList = (props) => {
  const dispatch = useDispatch() // uus
  const storePage = useSelector(state => state.page) //uus
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const {ids} = civstuff
  const {
        //civ1,civ2, 
        //setCiv1, setCiv2, 
        setGuideType,
        setPu1, setPu2,
        pu1, pu2} = props
  const imageNames = Object.keys(images.civImages)

  const buttFunc = (civ) => {
    const chosenCiv = civ.split(".")[0]
    civService.getCivPowerUnit(ids[chosenCiv]).then(civ => {
      if (isEmpty(pu1[0])){
        civ.civ = chosenCiv
        setPu1([civ])
        return
      }
      if (isEmpty(pu2[0])) {
        civ.civ = chosenCiv
        setPu2([civ])
      }
    })
    civService.getWithId(ids[chosenCiv]).then(civ => {
      if (isEmpty(civ1[0])){
        dispatch(setCiv1(civ))
        return
      }
      if (isEmpty(civ2[0])){
        dispatch(setCiv2(civ))
      }
      setGuideType('matchup')
      dispatch(pageChange('guide')) 
    })
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
            image={images.civImages[n]} //imageObj[n]
            buttFunc={buttFunc}
          />
        ))}
      </div>

    </div>
  )
}

/*
<button><img src={goths}
        alt="gothciv" 
        onClick={() => buttFunc("gothciv")} 
      /></button>
*/

export default CivsList