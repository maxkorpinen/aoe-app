import { useDispatch } from 'react-redux'
import { pageChange } from "../../../reducers/pageReducer"

const About = () => {
  const dispatch = useDispatch()

  const showAbout = () => {
    dispatch(pageChange('about'))
  }

  return(
    <button className='upper' onClick={() => showAbout()}>
      About
    </button>
  )
}

export default About