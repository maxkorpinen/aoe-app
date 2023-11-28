import { useSelector } from 'react-redux/es/hooks/useSelector'
import './buttonhighlight.css'
import f from '../../../utils/helpfuncs'

const CivButton = (props) => {
  const { image, name, buttFunc } = props
  const civ1 = useSelector(state => state.civs['civ1'])
  const { isEmpty } = f

  if(!isEmpty(civ1[0])){
    if(civ1[0].name.toLowerCase() === name.split(".")[0].toLowerCase()) {
      return(
        <button key={name} className="btnhighlight">
          <img src={image}
            alt = {name}
            onClick={() => buttFunc(name)}
            width={100}
            height={100}/>
        </button>
      )
    }
  }

  return (
    <button key={name}>
      <img src={image}
        alt = {name}
        onClick={() => buttFunc(name)}
        width={100}
        height={100}/>
    </button>
  )
}

export default CivButton