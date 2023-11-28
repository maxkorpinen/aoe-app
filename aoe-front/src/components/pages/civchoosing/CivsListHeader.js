import { useSelector } from 'react-redux'
import f from '../../../utils/helpfuncs'

const CivsListHeader = () => {
  const civ1 = useSelector(state => state.civs['civ1'])
  const { isEmpty } = f
  return(
    <>
      {isEmpty(civ1[0]) &&
        <p>Choose your civ </p>
      }
      {!isEmpty(civ1) &&
        <p>Your civ: {civ1[0].name}. Choose opponents civ!</p>
      }
    </>
  )
}

export default CivsListHeader