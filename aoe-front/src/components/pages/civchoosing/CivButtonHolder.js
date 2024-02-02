import { useSelector } from 'react-redux';
import CivButton from "./CivButton"

const CivButtonHolder = ({ f }) => {
  //const imageNames = Object.keys(images.civImages)
  const civlist = useSelector(state => state.allCivs);

  return(
    <div>
      {civlist.map((n) => (
        <CivButton
          key={n.id}
          id={n.id}
          name={n.name}
          image={n.image}
          buttFunc={f}
        />
      ))}
    </div>
  )
}

export default CivButtonHolder