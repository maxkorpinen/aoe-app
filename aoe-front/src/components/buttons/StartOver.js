import { useDispatch } from "react-redux"
import { resetCivs } from '../../reducers/civReducer'
import { resetPu } from '../../reducers/powerunitReducer'
import { pageChange, guideChange, civsSetChange } from '../../reducers/pageReducer'
import { showLoginFormChange } from "../../reducers/topButtonsReducer"

const StartOver = () => {
  const dispatch = useDispatch()
  const goBeginning = () => {
    dispatch(resetCivs())
    dispatch(resetPu())
    dispatch(pageChange('choose'))
    dispatch(guideChange(''))
    dispatch(civsSetChange(0))
    dispatch(showLoginFormChange(false))
  }
  return(
    <button onClick={() => goBeginning()}>Start over</button>
  )
}

export default StartOver