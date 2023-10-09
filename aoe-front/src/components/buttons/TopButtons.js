import { useDispatch, useSelector } from 'react-redux'
import { resetCivs } from '../../reducers/civReducer'
import { resetPu } from '../../reducers/powerunitReducer'
import { pageChange } from '../../reducers/pageReducer'
import { setError } from '../../reducers/errorReducer'
import Login from './Login'
import f from '../../utils/helpfuncs'

const TopButtons = ({setGuideType}) => {
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const user = useSelector(state => state.user.username)
  const dispatch = useDispatch()
  const isEmpty = f.isEmpty
  
  const beginning = () => {
    dispatch(resetCivs())
    dispatch(resetPu())
    dispatch(pageChange('choose')) 
    setGuideType('')
  }

  const showGuide = () => {
    if(isEmpty(civ1)) {
      dispatch(setError('choose at least one civ'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
      return
    }
    if(!isEmpty(civ1) && !isEmpty(civ2)) {
      setGuideType('matchup')
    }
    if(!isEmpty(civ1) && isEmpty(civ2)) {
      setGuideType('civguide')
    }
    dispatch(pageChange('guide'))
  }

  const kakkatraktori = () => {
    
  }

  return(
    <div>
      <button onClick={() => beginning()}>Start over</button>
      <button onClick={() => showGuide()}>Analyse with chosen specs</button>
      <Login />
      { user &&
        <button onClick={() => dispatch(pageChange('user'))}>Userinfo</button>
      }
    </div>
  )
}

export default TopButtons