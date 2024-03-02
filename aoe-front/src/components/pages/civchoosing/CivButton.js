import { useSelector } from 'react-redux/es/hooks/useSelector'
import './buttonhighlight.css'
import f from '../../../utils/helpfuncs'

const CivButton = (props) => {
  const { image, name, id, buttFunc } = props
  const civ1 = useSelector(state => state.civs.civ1)
  const { isEmpty } = f

  if(!isEmpty(civ1)){
    if(civ1.toLowerCase() === name.split(".")[0].toLowerCase()) {
      return(
        <button key={id} className="btnhighlight">
          <img src={image}
            value={id}
            alt = {name}
            onClick={() => buttFunc(id)}
            width={100}
            height={100}/>
        </button>
      )
    }
  }

  return (
    <button key={id}>
      <img src={image}
        value={id}
        alt = {name}
        onClick={() => buttFunc(id)}
        width={100}
        height={100}/>
    </button>
  )
}

export default CivButton