import { useSelector } from "react-redux/es/hooks/useSelector"
import f from '../../utils/helpfuncs'

const UnitBox = ({ text, unit, imgs, seenUnit, winpct }) => {
  //const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const { isEmpty } = f

  return(
    <div>
      {unit &&
        <div>
          <h4>{text}{unit}</h4>
          {!isEmpty(civ2) &&
          <p>Winpct {winpct.toFixed(3)*100}</p> }
          {imgs.map((img) => (
            <img key={img} src={img} //vaihda avain!!!
              height="200"
              alt=""
              width="200"/>
          ))}
        </div>
      }
      {seenUnit &&
        <div>
          <p>{seenUnit}</p>
        </div>
      }
    </div>
  )
}

export default UnitBox
