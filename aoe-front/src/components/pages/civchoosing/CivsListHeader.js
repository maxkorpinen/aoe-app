import { useSelector } from 'react-redux'
import f from '../../../utils/helpfuncs'

const CivsListHeader = () => {
  const civlist = useSelector(state => state.allCivs);

  const civ1 = useSelector(state => state.civs['civ1'])
  const civ1Obj = civlist.find(civ => civ.id === civ1);

  const { isEmpty } = f
  return(
    <>
      {isEmpty(civ1) &&
        <p>Choose your civ </p>
      }
      {!isEmpty(civ1) &&
        <p>Your civ: {civ1Obj && civ1Obj.name}. Choose opponents civ!</p>
      }
    </>
  )
}

export default CivsListHeader