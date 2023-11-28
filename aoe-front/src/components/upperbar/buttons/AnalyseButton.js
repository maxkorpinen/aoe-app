import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../../reducers/errorReducer'
import { pageChange, guideChange } from '../../../reducers/pageReducer'
import f from '../../../utils/helpfuncs'

const AnalyseButton = () => {
  const dispatch = useDispatch()
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const { isEmpty } = f

  const showGuide = () => {
    if(isEmpty(civ1)) {
      dispatch(setError('choose at least one civ'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
      return
    }
    if(!isEmpty(civ1) && !isEmpty(civ2)) {
      dispatch(guideChange('matchup'))
    }
    if(!isEmpty(civ1) && isEmpty(civ2)) {
      dispatch(guideChange('civguide'))
    }
    dispatch(pageChange('guide'))
  }

  return(
    <button onClick={() => showGuide()}>Analyse with chosen specs</button>
  )
}

export default AnalyseButton